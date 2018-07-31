import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { PublicHoliday } from './public-holiday.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<PublicHoliday>;

@Injectable()
export class PublicHolidayService {

    private resourceUrl =  SERVER_API_URL + 'api/public-holidays';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(publicHoliday: PublicHoliday): Observable<EntityResponseType> {
        const copy = this.convert(publicHoliday);
        return this.http.post<PublicHoliday>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(publicHoliday: PublicHoliday): Observable<EntityResponseType> {
        const copy = this.convert(publicHoliday);
        return this.http.put<PublicHoliday>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<PublicHoliday>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<PublicHoliday[]>> {
        const options = createRequestOption(req);
        return this.http.get<PublicHoliday[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PublicHoliday[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: PublicHoliday = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<PublicHoliday[]>): HttpResponse<PublicHoliday[]> {
        const jsonResponse: PublicHoliday[] = res.body;
        const body: PublicHoliday[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to PublicHoliday.
     */
    private convertItemFromServer(publicHoliday: PublicHoliday): PublicHoliday {
        const copy: PublicHoliday = Object.assign({}, publicHoliday);
        copy.dateHoliday = this.dateUtils
            .convertLocalDateFromServer(publicHoliday.dateHoliday);
        return copy;
    }

    /**
     * Convert a PublicHoliday to a JSON which can be sent to the server.
     */
    private convert(publicHoliday: PublicHoliday): PublicHoliday {
        const copy: PublicHoliday = Object.assign({}, publicHoliday);
        copy.dateHoliday = this.dateUtils
            .convertLocalDateToServer(publicHoliday.dateHoliday);
        return copy;
    }
}
