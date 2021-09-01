import { Client } from "./modelClients";

export { };
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const projectsJsonPath = path.resolve(__dirname, "./projects.json");

//Function to read the JSON of created projects
const readJsonProjects = () => {
    try {
        const projects = fs.readFileSync(projectsJsonPath);
        return JSON.parse(projects);
    } catch (error) {
        console.error(error);
    }
};

enum Status {
    complete = 'complete',
    paidOut = 'paidOut',
    waitingForPayment = 'waitingForPayment',
    approvedOffer = 'approvedOffer',
    bidding = 'bidding'
}

enum Task {
    UI = 'userInterfaz',
    graphics = 'graphics',
    design = 'design'
}

export class Project {
    projectUuid: string;
    projectName: string;
    clientId: string;
    task: Task;
    status: Status;
    createdDate: any;
    totalHours: number;
    usedHours: number;

    constructor(projectName: string, clientId: string, task: Task, status: Status, totalHours: number) {
        this.projectUuid = uuidv4();
        this.projectName = projectName;
        this.clientId = clientId;
        this.task = task;
        this.status = status;
        this.createdDate = Date.now();
        this.totalHours = totalHours;
        this.usedHours = 0;
    }
}

export class Projects {
    projects: Array<Project>;

    constructor() {
        this.projects = readJsonProjects();
    }

    updateProjectsJson() {
        try {
            fs.writeFileSync(projectsJsonPath, JSON.stringify(this.projects));
        } catch (error) {
            console.error(error);
        }
    }

    createProject(project) {
        try {
            this.projects.push(project);
            this.updateProjectsJson();
        } catch (error) {
            console.error(error);
        }
    }

    findProjectByUuid(id) {
        try {
            const projectFound = this.projects.find(project => project.projectUuid === id);
            return projectFound;
        } catch (error) {
            console.error(error);
        }
    }

    deleteProject(id) {
        try {
            this.projects = this.projects.filter(project => project.projectUuid !== id);
            this.updateProjectsJson();
        } catch (error) {
            console.error(error);
        }
    }
}
