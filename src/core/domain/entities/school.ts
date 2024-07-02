import { PointGeometry } from "./geometry";

export interface School {
    schoolName: string;
    category: string;
    type: string;
    section: string;
    studentCount: number;
    teacherCount: number;
    classroomCount: number;
    latrineCount: number;
    water: boolean;
    electricity: boolean;
    computerRoom: boolean;
    neighborhood: string;
    geometry: PointGeometry;
}