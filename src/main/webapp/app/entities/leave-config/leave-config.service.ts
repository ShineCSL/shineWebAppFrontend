import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { LeaveConfig } from './leave-config.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<LeaveConfig>;

@Injectable()
export class LeaveConfigService {

    private resourceUrl =  SERVER_API_URL + 'api/leave-configs';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(leaveConfig: LeaveConfig): Observable<EntityResponseType> {
        const copy = this.convert(leaveConfig);
        return this.http.post<LeaveConfig>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(leaveConfig: LeaveConfig): Observable<EntityResponseType> {
        const copy = this.convert(leaveConfig);
        return this.http.put<LeaveConfig>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<LeaveConfig>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<LeaveConfig[]>> {
        const options = createRequestOption(req);
        return this.http.get<LeaveConfig[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<LeaveConfig[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: LeaveConfig = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<LeaveConfig[]>): HttpResponse<LeaveConfig[]> {
        const jsonResponse: LeaveConfig[] = res.body;
        const body: LeaveConfig[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to LeaveConfig.
     */
    private convertItemFromServer(leaveConfig: LeaveConfig): LeaveConfig {
        const copy: LeaveConfig = Object.assign({}, leaveConfig);
        copy.dateCreation = this.dateUtils
            .convertDateTimeFromServer(leaveConfig.dateCreation);
        copy.dateModification = this.dateUtils
            .convertDateTimeFromServer(leaveConfig.dateModification);
        return copy;
    }

    /**
     * Convert a LeaveConfig to a JSON which can be sent to the server.
     */
    private convert(leaveConfig: LeaveConfig): LeaveConfig {
        const copy: LeaveConfig = Object.assign({}, leaveConfig);

        copy.dateCreation = this.dateUtils.toDate(leaveConfig.dateCreation);

        copy.dateModification = this.dateUtils.toDate(leaveConfig.dateModification);
        return copy;
    }
}
