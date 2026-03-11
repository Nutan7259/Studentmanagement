import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsModule } from './students/students.module';
import { Student } from './students/student.entity'; // <-- ADD THIS IMPORT

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root', 
      password: 'Nutan@123', // Ensure this matches your MySQL password
      database: 'student_db', 
      entities: [Student], // Now this will work
      synchronize: true, 
    }),
    StudentsModule,
  ],
})
export class AppModule {}