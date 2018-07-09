import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { LeavesRejection } from './leaves-rejection.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<LeavesRejection>;

@Injectable()
export class LeavesRejectionService {

    private resourceUrl =  SERVER_API_URL + 'api/leaves-rejections';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(leavesRejection: LeavesRejection): Observable<EntityResponseType> {
        const copy = this.convert(leavesRejection);
        return this.http.post<LeavesRejection>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(leavesRejection: LeavesRejection): Observable<EntityResponseType> {
        const copy = this.convert(leavesRejection);
        return this.http.put<LeavesRejection>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<LeavesRejection>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<LeavesRejection[]>> {
        const options = createRequestOption(req);
        return this.http.get<LeavesRejection[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<LeavesRejection[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: LeavesRejection = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<LeavesRejection[]>): HttpResponse<LeavesRejection[]> {
        const jsonResponse: LeavesRejection[] = res.body;
        const body: LeavesRejection[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to LeavesRejection.
     */
    private convertItemFromServer(leavesRejection: LeavesRejection): LeavesRejection {
        const copy: LeavesRejection = Object.assign({}, leavesRejection);
        copy.leavesDate = this.dateUtils
            .convertLocalDateFromServer(leavesRejection.leavesDate);
        return copy;
    }

    /**
     * Convert a LeavesRejection to a JSON which can be sent to the server.
     */
    private convert(leavesRejection: LeavesRejection): LeavesRejection {
        const copy: LeavesRejection = Object.assign({}, leavesRejection);
        copy.leavesDate = this.dateUtils
            .convertLocalDateToServer(leavesRejection.leavesDate);
        return copy;
    }
}
