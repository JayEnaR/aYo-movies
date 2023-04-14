import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, of, switchMap } from 'rxjs';
import { QueryTypeEnum } from 'src/app/enums/query-type.enum';
import { IQueryType } from 'src/app/models/IQueryType';
import { ISearchResult } from 'src/app/models/ISearchResult';
import { MovieSearchService } from 'src/app/services/movie-search.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  searchForm: FormGroup;
  hasValue: boolean = false;
  queryType: QueryTypeEnum = QueryTypeEnum.movie;
  queryTypes: IQueryType[] = [];

  constructor(private _formBuilder: FormBuilder,
    private _movieSearchService: MovieSearchService) {
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

  // Builds the appropriate query based on audiovisual type
  initQuery(name: string): string {
    switch (this.queryType) {
      case QueryTypeEnum.movie: {
        name = `type=movie&t=${name}`;
        break;
      }
      case QueryTypeEnum.series: {
        name = `type=series&t=${name}`;
        break;
      }
      case QueryTypeEnum.episode: {
        name = `type=episode&t=${name}`;
        break;
      }
    }
    return name;
  }

  clearSearch(): void {
    this.searchForm.reset();
  }

  // Filters results based on audiovisual type
  onChipChange(val: QueryTypeEnum): void {
    this.queryType = val;
    const name = this.searchForm.controls['search'].value;
    if (name) {
      const query = this.initQuery(this.searchForm.controls['search'].value);
      this._movieSearchService.retrieveCinema(query).subscribe();
    }
  }

  // Call the endpoint on keychange after 1 second
  searchBarValidator(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      if (control.value) {
        return control.valueChanges.pipe(
          debounceTime(1000),
          distinctUntilChanged(),
          switchMap(phrase => this._movieSearchService.retrieveCinema(this.initQuery(phrase))),
          map((res: ISearchResult) => res ? { noResult: true } : null)
        );
      }
      return of();
    }
  }

}
