import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentsRepository: Repository<Student>,
  ) {}

  findAll() {
    return this.studentsRepository.find();
  }

  create(studentData: any) {
    const newStudent = this.studentsRepository.create(studentData);
    return this.studentsRepository.save(newStudent);
  }
}