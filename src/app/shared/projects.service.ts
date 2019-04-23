import { Project } from '../shared/project.model';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class ProjectsService {
  public projects: Project[] = [];
  public projectsUpdated = new Subject<Project[]>();

  constructor(private http: HttpClient) {}

  getProjects() {
    return this.http.get<Project[]>('http://localhost:3000/projects')
    .subscribe((projData) => {
      console.log(projData)
      this.projects = projData;
      this.projectsUpdated.next([...this.projects]);
      console.log(this.projects);
    })
  }

  getProjectsUpdateListener(){
    return this.projectsUpdated.asObservable();
  }

  getProjectById(id: number){
    return this.http.get<Project>('http://localhost:3000/projects/' + id);
  }

  addProject(project: Project){
    return this.http.post('http://localhost:3000/projects', project);
  }

  editProject(project: Project){
    return this.http.put('http://localhost:3000/projects/' + project.id, project);
  }

  deleteProject(id: number){
    return this.http.delete('http://localhost:3000/projects/' + id);

  }

}
