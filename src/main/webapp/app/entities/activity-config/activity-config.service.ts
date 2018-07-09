import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ActivityConfig } from './activity-config.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ActivityConfig>;

@Injectable()
export class ActivityConfigService {

    private resourceUrl =  SERVER_API_URL + 'api/activity-configs';

    constructor(private http: HttpClient) { }

    create(activityConfig: ActivityConfig): Observable<EntityResponseType> {
        const copy = this.convert(activityConfig);
        return this.http.post<ActivityConfig>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(activityConfig: ActivityConfig): Observable<EntityResponseType> {
        const copy = this.convert(activityConfig);
        return this.http.put<ActivityConfig>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ActivityConfig>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ActivityConfig[]>> {
        const options = createRequestOption(req);
        return this.http.get<ActivityConfig[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ActivityConfig[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ActivityConfig = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ActivityConfig[]>): HttpResponse<ActivityConfig[]> {
        const jsonResponse: ActivityConfig[] = res.body;
        const body: ActivityConfig[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ActivityConfig.
     */
    private convertItemFromServer(activityConfig: ActivityConfig): ActivityConfig {
        const copy: ActivityConfig = Object.assign({}, activityConfig);
        return copy;
    }

    /**
     * Convert a ActivityConfig to a JSON which can be sent to the server.
     */
    private convert(activityConfig: ActivityConfig): ActivityConfig {
        const copy: ActivityConfig = Object.assign({}, activityConfig);
        return copy;
    }
}
