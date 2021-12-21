import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Live } from 'src/app/shared/model/live.model';
import { LiveService } from 'src/app/shared/service/live.service';

@Component({
  selector: 'app-live-list',
  templateUrl: './live-list.component.html',
  styleUrls: ['./live-list.component.css']
})
export class LiveListComponent implements OnInit {

  livesPrevious: Live[];
  livesNext: Live[];
  nextLoading: boolean = false;
  previousLoading: boolean = false;

  constructor(
    public liveService: LiveService,
    public sanitazer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.getLives() 
  }

  getLives(){
    this.liveService.getLivesWithFlag('previous').subscribe(data => {
      this.livesPrevious = data.content;
      console.log(this.livesPrevious);
      this.livesPrevious.forEach(live => {
        //cria uma url segura para inserir o link do youtube
        live.urlSafe = this.sanitazer.bypassSecurityTrustResourceUrl(live.liveLink);
      });
      this.previousLoading = true;
    });

    this.liveService.getLivesWithFlag('next').subscribe(data => {
      this.livesNext = data.content;
      console.log(this.livesNext);
      this.livesNext.forEach(live => {
        //cria uma url segura para inserir o link do youtube
        live.urlSafe = this.sanitazer.bypassSecurityTrustResourceUrl(live.liveLink);
      });
      this.nextLoading = true
    });
  }    

}
