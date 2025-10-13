// 代码生成时间: 2025-10-13 23:59:44
import { PrismaClient } from '@prisma/client';

// Initialize the PrismaClient
const prisma = new PrismaClient();

// Define the Student type
interface Student {
  id: number;
  name: string;
  age: number;
  grade: string;
}

// StudentService class to handle student profile operations
class StudentService {
  // Adds a new student profile
  async addStudent(student: Student): Promise<Student> {
    try {
      const result = await prisma.student.create({
        data: student,
      });
      return result;
    } catch (error) {
      console.error('Failed to add student:', error);
      throw error;
    }
  }

  // Retrieves a student profile by ID
  async getStudentById(id: number): Promise<Student | null> {
    try {
      const result = await prisma.student.findUnique({
        where: { id },
      });
      return result;
    } catch (error) {
      console.error('Failed to retrieve student:', error);
      throw error;
    }
  }

  // Updates an existing student profile
  async updateStudent(id: number, student: Partial<Student>): Promise<Student | null> {
    try {
      const result = await prisma.student.update({
        where: { id },
        data: student,
      });
      return result;
    } catch (error) {
      console.error('Failed to update student:', error);
      throw error;
    }
  }

  // Deletes a student profile by ID
  async deleteStudent(id: number): Promise<Student | null> {
    try {
      const result = await prisma.student.delete({
        where: { id },
      });
      return result;
    } catch (error) {
      console.error('Failed to delete student:', error);
      throw error;
    }
  }
}

// Example usage of StudentService
const main = async () => {
  const studentService = new StudentService();

  // Create a new student
  const newStudent = await studentService.addStudent({
    name: 'John Doe',
    age: 20,
    grade: 'A',
  });
  console.log('New Student:', newStudent);

  // Get a student by ID
  const student = await studentService.getStudentById(1);
  console.log('Student:', student);

  // Update a student's grade
  const updatedStudent = await studentService.updateStudent(1, { grade: 'A+' });
  console.log('Updated Student:', updatedStudent);

  // Delete a student
  const deletedStudent = await studentService.deleteStudent(1);
  console.log('Deleted Student:', deletedStudent);
};

main().catch(console.error);