import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ActivityRejection } from './activity-rejection.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ActivityRejection>;

@Injectable()
export class ActivityRejectionService {

    private resourceUrl =  SERVER_API_URL + 'api/activity-rejections';

    constructor(private http: HttpClient) { }

    create(activityRejection: ActivityRejection): Observable<EntityResponseType> {
        const copy = this.convert(activityRejection);
        return this.http.post<ActivityRejection>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(activityRejection: ActivityRejection): Observable<EntityResponseType> {
        const copy = this.convert(activityRejection);
        return this.http.put<ActivityRejection>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ActivityRejection>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ActivityRejection[]>> {
        const options = createRequestOption(req);
        return this.http.get<ActivityRejection[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ActivityRejection[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ActivityRejection = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ActivityRejection[]>): HttpResponse<ActivityRejection[]> {
        const jsonResponse: ActivityRejection[] = res.body;
        const body: ActivityRejection[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ActivityRejection.
     */
    private convertItemFromServer(activityRejection: ActivityRejection): ActivityRejection {
        const copy: ActivityRejection = Object.assign({}, activityRejection);
        return copy;
    }

    /**
     * Convert a ActivityRejection to a JSON which can be sent to the server.
     */
    private convert(activityRejection: ActivityRejection): ActivityRejection {
        const copy: ActivityRejection = Object.assign({}, activityRejection);
        return copy;
    }
}
