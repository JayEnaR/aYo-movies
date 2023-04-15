import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, map, of, switchMap, takeUntil, tap } from 'rxjs';
import { animations } from 'src/app/animations/public-api';
import { QueryTypeEnum } from 'src/app/enums/query-type.enum';
import { IQueryType } from 'src/app/models/IQueryType';
import { IResponse } from 'src/app/models/IResponse';
import { ISearchResult } from 'src/app/models/ISearchResult';
import { AudioVisualSearchService } from 'src/app/services/audio-visual-search.service';
import { ProgressBarService } from 'src/app/services/progress-bar.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  animations: animations,
  host: {'[@fadeInOut]': ''}
})
export class SearchBarComponent implements OnInit {

  searchForm: FormGroup;
  hasValue: boolean = false;
  queryType: QueryTypeEnum = QueryTypeEnum.movie;
  queryTypes: IQueryType[] = [];


  constructor(private _formBuilder: FormBuilder,
    private _movieSearchService: AudioVisualSearchService,
    private _progressBarservice: ProgressBarService) {
    this.searchForm = this.buildForm();
    this.searchForm.get('search')!.valueChanges.subscribe((value: string) => {
      this.hasValue = (value ? true : false);
    });
  }

  ngOnInit(): void {
    for (let i in QueryTypeEnum) {
      if (isNaN(+QueryTypeEnum[i]))
        this.queryTypes.push({ key: QueryTypeEnum[QueryTypeEnum[i] as keyof typeof QueryTypeEnum], value: QueryTypeEnum[i] });
    }
  }

  buildForm(): FormGroup {
    return this._formBuilder.group({
      search: ['', [], this.searchBarValidator()]
    });
  }


  clearSearch(): void {
    this.searchForm.reset();
    this._movieSearchService.cinema = {} as IResponse<ISearchResult[]>;
  }

  // Filters results based on audiovisual type selected
  onChipChange(val: QueryTypeEnum): void {
    this.queryType = val;
    const name = this.searchForm.controls['search'].value;
    if (name) {
      this._progressBarservice.showProgress(true);
      const unsub = new Subject<void>();
      this._movieSearchService.retrieveCinemas(name, val).pipe(takeUntil(unsub)).subscribe(() => {
        this._progressBarservice.showProgress(false);
        unsub.next();
        unsub.complete();
      });
    }
  }


  // Call the endpoint on keychange after 1 second
  searchBarValidator(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      if (control.value) {
        this._progressBarservice.showProgress(true);
        return control.valueChanges.pipe(
          debounceTime(1000),
          distinctUntilChanged(),
          switchMap(phrase => this._movieSearchService.retrieveCinemas(phrase, this.queryType)),
          map((res: IResponse<ISearchResult[]>) => res ),
          tap(a => {
            console.log(a);
            
             this._progressBarservice.showProgress(false)})
        );
      }
      return of();
    }
  }

}
