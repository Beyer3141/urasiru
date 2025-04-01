import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAssessmentSchema } from "@shared/schema";
import { calculatePersonalityResult } from "./utils/personality-calculator";
import { z } from "zod";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Endpoint to submit assessment and get results
  app.post("/api/assessment", async (req, res) => {
    try {
      // Validate request body
      const assessment = insertAssessmentSchema.parse(req.body);
      
      // Calculate MBTI type based on responses
      const mbtiResponses = assessment.mbtiResponses;
      const birthDate = {
        year: assessment.birthYear,
        month: assessment.birthMonth,
        day: assessment.birthDay,
        hour: assessment.birthHour,
        minute: assessment.birthMinute
      };
      
      // Calculate personality analysis
      const personalityResult = calculatePersonalityResult(
        mbtiResponses, 
        birthDate, 
        assessment.gender,
        assessment.firstNameKanji || undefined,
        assessment.lastNameKanji || undefined
      );
      
      // 姓名判断と四柱推命の結果をJSON文字列に変換（存在する場合のみ）
      const seiMeiResultStr = personalityResult.seiMeiResult ? 
        JSON.stringify(personalityResult.seiMeiResult) : undefined;
      
      const fourPillarsResultStr = personalityResult.fourPillarsResult ? 
        JSON.stringify(personalityResult.fourPillarsResult) : undefined;
      
      // nullを除去してundefinedに変換
      const cleanedAssessment = {
        fullName: assessment.fullName,
        birthYear: assessment.birthYear,
        birthMonth: assessment.birthMonth,
        birthDay: assessment.birthDay,
        gender: assessment.gender,
        lifeFocus: assessment.lifeFocus || undefined,
        challenges: assessment.challenges || [],
        strengths: assessment.strengths || undefined,
        mbtiResponses: assessment.mbtiResponses,
        // nullable fields
        firstNameKanji: assessment.firstNameKanji || undefined,
        lastNameKanji: assessment.lastNameKanji || undefined,
        birthHour: assessment.birthHour || undefined,
        birthMinute: assessment.birthMinute || undefined
      };
      
      // Save assessment with results
      const savedAssessment = await storage.createAssessment({
        ...cleanedAssessment,
        mbtiType: personalityResult.mbtiResult.type,
        sanmeiType: personalityResult.sanmeiResult.fullType,
        typeNickname: personalityResult.typeNickname,
        seiMeiResult: seiMeiResultStr,
        fourPillarsResult: fourPillarsResultStr,
        resultJson: personalityResult
      });
      
      // Return assessment and analysis results
      return res.status(200).json({
        success: true,
        assessment: savedAssessment,
        result: personalityResult
      });
      
    } catch (error) {
      console.error("Error processing assessment:", error);
      
      if (error instanceof ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid assessment data", 
          errors: error.errors 
        });
      }
      
      return res.status(500).json({ 
        success: false, 
        message: "Failed to process assessment" 
      });
    }
  });

  // Get assessment history by ID
  app.get("/api/assessment/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ success: false, message: "Invalid ID" });
      }
      
      const assessment = await storage.getAssessment(id);
      
      if (!assessment) {
        return res.status(404).json({ success: false, message: "Assessment not found" });
      }
      
      return res.status(200).json({ 
        success: true, 
        assessment 
      });
      
    } catch (error) {
      console.error("Error fetching assessment:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Failed to fetch assessment" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
