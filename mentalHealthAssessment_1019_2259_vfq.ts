// 代码生成时间: 2025-10-19 22:59:47
import { PrismaClient } from '@prisma/client';

// Define the assessment model
interface MentalHealthAssessment {
  id: number;
  patientId: number;
  score: number;
  timestamp: Date;
}

// Define the Patient model
interface Patient {
  id: number;
  name: string;
}

class MentalHealthService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  // Perform a mental health assessment for a patient
  async performAssessment(patientId: number): Promise<MentalHealthAssessment> {
    try {
      // Generate a score based on some criteria (placeholder logic)
      const score = Math.floor(Math.random() * 100);

      // Create a new assessment record
      const assessment: MentalHealthAssessment = await this.prisma.mentalHealthAssessment.create({
        data: {
          patientId: patientId,
          score: score,
          timestamp: new Date(),
        },
      });

      return assessment;
    } catch (error) {
      console.error('Failed to perform mental health assessment:', error);
      throw new Error('Failed to perform assessment due to a database error.');
    }
  }

  // Retrieve a patient's mental health assessment history
  async getAssessmentHistory(patientId: number): Promise<MentalHealthAssessment[]> {
    try {
      const assessments = await this.prisma.mentalHealthAssessment.findMany({
        where: {
          patientId: patientId,
        },
      });

      return assessments;
    } catch (error) {
      console.error('Failed to retrieve assessment history:', error);
      throw new Error('Failed to retrieve assessment history due to a database error.');
    }
  }
}

// Example usage
async function main() {
  const mentalHealthService = new MentalHealthService();

  try {
    const patientId = 1; // Assume this is the ID of the patient to assess
    const assessment = await mentalHealthService.performAssessment(patientId);
    console.log('Mental Health Assessment:', assessment);

    const history = await mentalHealthService.getAssessmentHistory(patientId);
    console.log('Assessment History:', history);
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
}

main();