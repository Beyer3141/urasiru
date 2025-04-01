import { users, type User, type InsertUser, type Assessment, type InsertAssessment } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAssessment(id: number): Promise<Assessment | undefined>;
  createAssessment(assessment: InsertAssessment & { 
    mbtiType: string, 
    sanmeiType: string, 
    typeNickname: string,
    resultJson: any,
    // 姓名判断と四柱推命の追加フィールド
    firstNameKanji?: string,
    lastNameKanji?: string,
    birthHour?: number,
    birthMinute?: number,
    seiMeiResult?: string,
    fourPillarsResult?: string
  }): Promise<Assessment>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private assessments: Map<number, Assessment>;
  private userCurrentId: number;
  private assessmentCurrentId: number;

  constructor() {
    this.users = new Map();
    this.assessments = new Map();
    this.userCurrentId = 1;
    this.assessmentCurrentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAssessment(id: number): Promise<Assessment | undefined> {
    return this.assessments.get(id);
  }

  async createAssessment(assessment: InsertAssessment & { 
    mbtiType: string, 
    sanmeiType: string, 
    typeNickname: string,
    resultJson: any,
    // 姓名判断と四柱推命の追加フィールド
    firstNameKanji?: string,
    lastNameKanji?: string,
    birthHour?: number,
    birthMinute?: number,
    seiMeiResult?: string,
    fourPillarsResult?: string
  }): Promise<Assessment> {
    const id = this.assessmentCurrentId++;
    
    const newAssessment: Assessment = {
      id,
      fullName: assessment.fullName,
      birthYear: assessment.birthYear,
      birthMonth: assessment.birthMonth,
      birthDay: assessment.birthDay,
      gender: assessment.gender,
      lifeFocus: assessment.lifeFocus || null,
      challenges: assessment.challenges || [],
      strengths: assessment.strengths || null,
      mbtiType: assessment.mbtiType,
      sanmeiType: assessment.sanmeiType,
      typeNickname: assessment.typeNickname,
      // 姓名判断と四柱推命の追加フィールド
      firstNameKanji: assessment.firstNameKanji || null,
      lastNameKanji: assessment.lastNameKanji || null,
      birthHour: assessment.birthHour || null,
      birthMinute: assessment.birthMinute || null,
      seiMeiResult: assessment.seiMeiResult || null,
      fourPillarsResult: assessment.fourPillarsResult || null,
      resultJson: assessment.resultJson,
      createdAt: new Date()
    };
    
    this.assessments.set(id, newAssessment);
    return newAssessment;
  }
}

export const storage = new MemStorage();
