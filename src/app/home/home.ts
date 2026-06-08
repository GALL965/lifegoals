import { Component, OnInit } from '@angular/core';
import { Meta } from '../models/meta.model';
import { MetaService } from '../services/meta-service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  metas: Meta[] = [];

  nuevaMeta = '';

  constructor(
    private readonly metaService: MetaService
  ) {}

  ngOnInit(): void {

    this.metaService.getMetas()
      .subscribe(data => {
        this.metas = data;
      });
  }

  agregar() {

    if (!this.nuevaMeta.trim())
      return;

    this.metaService.addMeta(
      this.nuevaMeta
    );

    this.nuevaMeta = '';
  }

  eliminar(id: string) {

    this.metaService.deleteMeta(id);
  }
}
