import { CampaignObject } from 'src/app/classes/campaign/campaign.model';
import { GeneratorTextComponent } from './generator-text.component';
import { LoaderComponent } from '../loader/loader.component';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatBottomSheet, MatDialog } from '@angular/material';
import { DOCUMENT } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-web-modal',
  templateUrl: './web-modal.component.html',
  styleUrls: ['./web-modal.component.css']
})
export class WebModalComponent implements OnInit {
  public emailDef: string = '';
  public textConsult: string = '';
  public campaignType: string = 'Ads web';
constructor(public dialogRef: MatDialogRef<WebModalComponent>,
  @Inject(MAT_DIALOG_DATA) public data: string,
  @Inject(DOCUMENT) private document: Document,
  private bottomSheet: MatBottomSheet,
  private dialog: MatDialog, private _matSnack: MatSnackBar) {
    if (data && data !== '') {
      this.emailDef = data;
      return;
    }
  }

ngOnInit() {
}
closeModal() {
  setTimeout(() => {
    this.dialogRef.close();
  }, 100);
}
generateTextSheet() {
  const defaultTextComponent = this.bottomSheet.open(GeneratorTextComponent);
  defaultTextComponent.afterDismissed().subscribe(
    (textGenerated) => {
      if (textGenerated) {
        this.textConsult = textGenerated;
      }
    }
  );
}
sendCampaignMarketing(CampaignTicket: NgForm): void {
  if (CampaignTicket.invalid) {
    throw new Error('The form is invalid');
  }
  const ObjectCampaign: CampaignObject = new CampaignObject(CampaignTicket.value.name,
    CampaignTicket.value.email, CampaignTicket.value.message, CampaignTicket.value.campaign_type);
  const loader = this.dialog.open(LoaderComponent, {
    data: ObjectCampaign,
    disableClose: true
  });
  loader.afterClosed().subscribe(
    (campaignAfiliated: boolean): void => {
      if ((campaignAfiliated)) {
         this._matSnack.open('Gracias por confiar en nosotros, nos pondremos en contacto con usted pronto.', null, {
           duration: 5000,
           panelClass: ['success-snackbar']
         });
         CampaignTicket.reset();
         this.dialogRef.close();
      } else {
        this._matSnack.open('Error al procesar su información, inténtelo de nuevo más tarde.', null, {
          duration: 5000,
          panelClass: ['red-snackbar']
        });
        CampaignTicket.reset();
        this.dialogRef.close();
      }
    }
  );
}
}
