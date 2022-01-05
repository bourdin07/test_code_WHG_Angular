import { Component, OnInit, Input } from '@angular/core'
import { RendezVousService } from "@app/services/rendez-vous.service";
import { CategorieBilanService } from "@app/services/categorie-bilan.service";
import { SitePhysiqueService } from "@app/services/site-physique.service";
import { AppValidators } from "@shared/components/LayoutComponents/Form/app.validators";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-planning-transverse',
  templateUrl: './planning-transverse.component.html',
  styleUrls: ['./planning-transverse.component.scss']
})
export class PlanningTransverseComponent implements OnInit {
  @Input() item: string;

  form: FormGroup;
  rendezVous: any;
  plageMax = false;
  items1: any;
  items2: any;

  constructor(
    private fb: FormBuilder,
    private rendezVousService: RendezVousService,
    private sitesPhysiqueService: SitePhysiqueService,
    private categorieBilanService: CategorieBilanService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      item: [null],
      date_debut: [null],
      date_fin: [null],
    }, { validator: AppValidators.dateRange('date_debut', 'date_fin') });

    this.loadSitesPhysique();
    this.loadCategoriesBilan();
  }

  isSite() {
    return this.item === 'site';
  }

  isCategorie() {
    return this.item === 'categorie';
  }

  loadSitesPhysique() {
    this.sitesPhysiqueService.getActifSitesPhysiques().subscribe((result: any) => {
      if (this.isSite()) {
        this.items1 = result.data;
      }
    });
  }

  loadCategoriesBilan() {
    this.categorieBilanService.getActifCategoriesBilans().subscribe((result: any) => {
      if (this.isCategorie()) {
        this.items1 = result.data;
      }
    });
  }

  getRendezVous() {
    var maxDat = new Date(this.form.value.date_debut);
    maxDat.setDate(maxDat.getDate() + 35);
    if (this.form.value.date_fin > maxDat) {
      this.plageMax = true;
    } else {
      this.plageMax = false;
    }
    if (this.form.get('item').value !== null && this.form.get('date_debut').value !== null && this.form.get('date_fin').value !== null) {
      let start = this.form.get('date_debut').value;
      let end = this.form.get('date_fin').value;

      if (start < end) {
        if (this.isSite()) {
          this.rendezVousService.getRendezVousForSitePhysique(this.form.get('item').value, start, end).subscribe((result: any) => {
            this.rendezVous = result.values;
            this.items2 = result.items;
          });
        } else if (this.isCategorie()) {
          this.rendezVousService.getRendezVousForCategorieBilan(this.form.get('item').value, start, end).subscribe((result: any) => {
            this.rendezVous = result.values;
            this.items2 = result.items;
          });
        }
      }
    }
  }

  addZero(item) {
    if (item.toString().length === 1) {
      item = '0' + item.toString()
    }
    return item;
  }

  getDay(day) {
    switch (day) {
      case 'lun.':
        return 'Lu';
      case 'mar.':
        return 'Ma';
      case 'mer.':
        return 'Me';
      case 'jeu.':
        return 'Je';
      case 'ven.':
        return 'Ve';
      case 'sam.':
        return 'Sa';
    }
  }
}
