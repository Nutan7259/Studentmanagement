import { Injectable } from '@nestjs/common';

@Injectable()
export class StudentsService {
  private students = [
    { id: 1, name: "Rahul", email: "rahul@gmail.com", age: 22 }
  ];

  findAll() {
    return this.students;
  }

  // Add this method to resolve the error
  create(studentData: any) {
    const newStudent = {
      id: this.students.length + 1,
      ...studentData,
    };
    this.students.push(newStudent);
    return newStudent;
  }
}