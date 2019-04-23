import { Component, OnInit, OnDestroy } from '@angular/core';
import { Project } from '../../shared/project.model';
import { ProjectsService } from '../../shared/projects.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit, OnDestroy {
  projects: Project[] = [];
  private projectsSub: Subscription;

  constructor(public projectsService: ProjectsService) { }

  ngOnInit() {
    this.projectsService.getProjects();
    this.projectsSub = this.projectsService.getProjectsUpdateListener().subscribe((projects: Project[]) => this.projects = projects);
  }

  ngOnDestroy(): void {
    this.projectsSub.unsubscribe();
  }
}
