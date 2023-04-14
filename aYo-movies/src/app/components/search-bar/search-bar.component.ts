import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, first, map, switchMap, tap } from 'rxjs';
import { QueryTypeEnum } from 'src/app/enums/query-type.enum';
import { ISearchResult } from 'src/app/models/ISearchResult';
import { MovieSearchService } from 'src/app/services/movie-search.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  searchForm: FormGroup;
  isSearching: boolean = false;
  queryType: QueryTypeEnum = QueryTypeEnum.movie;

  constructor(private _formBuilder: FormBuilder,
    private _movieSearchService: MovieSearchService) {
    this.searchForm = this.buildForm();
    this.searchForm.get('search')!.statusChanges.subscribe((status: string) => {
      status === "PENDING" ? this.isSearching = true : this.isSearching = false;
    });
  }

  ngOnInit(): void {
    this._movieSearchService.cinema$.subscribe(a => console.log(a)
    )
  }

  buildForm(): FormGroup {
    return this._formBuilder.group({
      search: ['', [Validators.min(1)], this.searchBarValidator()]
    });
  }

  initQuery(name: string): string {
    switch(this.queryType){
      case QueryTypeEnum.movie : {
        name = `type=movie&t=${name}`;
        break;
      }
      case QueryTypeEnum.series : {
        name = `type=series&t=${name}`;
        break;
      }
      case QueryTypeEnum.episode : {
        name = `type=episode&t=${name}`;
        break;
      }
    }
    return name;
  }

  clearSearch(): void {

  }

  searchBarValidator(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return control.valueChanges.pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap(phrase => this._movieSearchService.retrieveCinema(this.initQuery(phrase))),
        map((res: ISearchResult) => res ? { noResult: true } : null)
      );
    }
  }

}
