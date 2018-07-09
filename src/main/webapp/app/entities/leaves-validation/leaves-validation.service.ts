import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { LeavesValidation } from './leaves-validation.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<LeavesValidation>;

@Injectable()
export class LeavesValidationService {

    private resourceUrl =  SERVER_API_URL + 'api/leaves-validations';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(leavesValidation: LeavesValidation): Observable<EntityResponseType> {
        const copy = this.convert(leavesValidation);
        return this.http.post<LeavesValidation>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(leavesValidation: LeavesValidation): Observable<EntityResponseType> {
        const copy = this.convert(leavesValidation);
        return this.http.put<LeavesValidation>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<LeavesValidation>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<LeavesValidation[]>> {
        const options = createRequestOption(req);
        return this.http.get<LeavesValidation[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<LeavesValidation[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: LeavesValidation = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<LeavesValidation[]>): HttpResponse<LeavesValidation[]> {
        const jsonResponse: LeavesValidation[] = res.body;
        const body: LeavesValidation[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to LeavesValidation.
     */
    private convertItemFromServer(leavesValidation: LeavesValidation): LeavesValidation {
        const copy: LeavesValidation = Object.assign({}, leavesValidation);
        copy.leavesDate = this.dateUtils
            .convertLocalDateFromServer(leavesValidation.leavesDate);
        return copy;
    }

    /**
     * Convert a LeavesValidation to a JSON which can be sent to the server.
     */
    private convert(leavesValidation: LeavesValidation): LeavesValidation {
        const copy: LeavesValidation = Object.assign({}, leavesValidation);
        copy.leavesDate = this.dateUtils
            .convertLocalDateToServer(leavesValidation.leavesDate);
        return copy;
    }
}
