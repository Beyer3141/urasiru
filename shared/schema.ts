import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// MBTI result scales (I-E, N-S, F-T, J-P)
export const mbtiScales = pgTable("mbti_scales", {
  id: serial("id").primaryKey(),
  assessmentId: integer("assessment_id").notNull(),
  ieScale: integer("ie_scale").notNull(), // Higher = more I
  nsScale: integer("ns_scale").notNull(), // Higher = more N
  ftScale: integer("ft_scale").notNull(), // Higher = more F
  jpScale: integer("jp_scale").notNull(), // Higher = more J
});

// Main assessment table
export const assessments = pgTable("assessments", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  birthYear: integer("birth_year").notNull(),
  birthMonth: integer("birth_month").notNull(),
  birthDay: integer("birth_day").notNull(),
  gender: text("gender").notNull(),
  lifeFocus: text("life_focus"),
  challenges: text("challenges").array(),
  strengths: text("strengths"),
  mbtiType: text("mbti_type").notNull(),
  sanmeiType: text("sanmei_type").notNull(),
  typeNickname: text("type_nickname").notNull(),
  // 姓名判断と四柱推命の追加フィールド
  firstNameKanji: text("first_name_kanji"),
  lastNameKanji: text("last_name_kanji"),
  birthHour: integer("birth_hour"),
  birthMinute: integer("birth_minute"),
  seiMeiResult: text("seimei_result"),      // 姓名判断結果
  fourPillarsResult: text("four_pillars"),  // 四柱推命結果
  resultJson: json("result_json").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Insert schema for assessment
export const insertAssessmentSchema = createInsertSchema(assessments)
  .omit({ id: true, mbtiType: true, sanmeiType: true, typeNickname: true, resultJson: true, createdAt: true })
  .extend({
    mbtiResponses: z.array(
      z.object({
        questionId: z.number(),
        answer: z.string(),
      })
    ),
  });

// Schema for MBTI responses
export const mbtiResponseSchema = z.object({
  questionId: z.number(),
  answer: z.string(),
});

// Schema for basic info
export const basicInfoSchema = z.object({
  fullName: z.string().min(1, "名前を入力してください"),
  birthYear: z.number().min(1900, "有効な年を選択してください").max(new Date().getFullYear()),
  birthMonth: z.number().min(1).max(12),
  birthDay: z.number().min(1).max(31),
  gender: z.enum(["male", "female", "other"]),
  // 姓名判断用の追加情報
  firstNameKanji: z.string().optional(),
  lastNameKanji: z.string().optional(),
  // 四柱推命用の追加情報（時間も入力可能に）
  birthHour: z.number().int().min(0).max(23).optional(),
  birthMinute: z.number().int().min(0).max(59).optional(),
});

// Schema for final questions
export const finalQuestionsSchema = z.object({
  lifeFocus: z.string().optional(),
  challenges: z.array(z.string()).optional(),
  strengths: z.string().optional(),
});

// 姓名判断の結果型定義
export const seiMeiResultSchema = z.object({
  nameTotal: z.number(),
  firstNameTotal: z.number(),
  lastNameTotal: z.number(),
  heavenNumber: z.number(),
  earthNumber: z.number(),
  humanNumber: z.number(),
  characteristics: z.array(z.string()),
  goodLuck: z.string(),
  advice: z.string()
});

// 四柱推命の結果型定義
export const fourPillarsResultSchema = z.object({
  heavenlyStem: z.string(),
  earthlyBranch: z.string(),
  dayMaster: z.string(),
  luckyElements: z.array(z.string()),
  unluckyElements: z.array(z.string()),
  lifeTheme: z.string()
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Assessment = typeof assessments.$inferSelect;
export type InsertAssessment = z.infer<typeof insertAssessmentSchema>;
export type MbtiResponse = z.infer<typeof mbtiResponseSchema>;
export type BasicInfo = z.infer<typeof basicInfoSchema>;
export type FinalQuestions = z.infer<typeof finalQuestionsSchema>;
export type SeiMeiResult = z.infer<typeof seiMeiResultSchema>;
export type FourPillarsResult = z.infer<typeof fourPillarsResultSchema>;
