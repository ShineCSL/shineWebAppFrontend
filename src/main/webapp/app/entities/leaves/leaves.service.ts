import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Leaves } from './leaves.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Leaves>;

@Injectable()
export class LeavesService {

    private resourceUrl =  SERVER_API_URL + 'api/leaves';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(leaves: Leaves): Observable<EntityResponseType> {
        const copy = this.convert(leaves);
        return this.http.post<Leaves>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(leaves: Leaves): Observable<EntityResponseType> {
        const copy = this.convert(leaves);
        return this.http.put<Leaves>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Leaves>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    getSumHoursByUserYearAndTask(userLogin: string, year: number, taskCode: string): Observable<HttpResponse<number>> {
        return this.http.get<any>(`${this.resourceUrl}/sumhours/${userLogin}/${year}/${taskCode}`, { observe: 'response'})
            .map((res: HttpResponse<any>) => res.body);
    }

    query(req?: any): Observable<HttpResponse<Leaves[]>> {
        const options = createRequestOption(req);
        return this.http.get<Leaves[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Leaves[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Leaves = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Leaves[]>): HttpResponse<Leaves[]> {
        const jsonResponse: Leaves[] = res.body;
        const body: Leaves[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Leaves.
     */
    private convertItemFromServer(leaves: Leaves): Leaves {
        const copy: Leaves = Object.assign({}, leaves);
        copy.leavesFrom = this.dateUtils
            .convertLocalDateFromServer(leaves.leavesFrom);
        copy.leavesTo = this.dateUtils
            .convertLocalDateFromServer(leaves.leavesTo);
        return copy;
    }

    /**
     * Convert a Leaves to a JSON which can be sent to the server.
     */
    private convert(leaves: Leaves): Leaves {
        const copy: Leaves = Object.assign({}, leaves);
        copy.leavesFrom = this.dateUtils
            .convertLocalDateToServer(leaves.leavesFrom);
        copy.leavesTo = this.dateUtils
            .convertLocalDateToServer(leaves.leavesTo);
        return copy;
    }
}
