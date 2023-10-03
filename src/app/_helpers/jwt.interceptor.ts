import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import { Observable} from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from '../account/auth/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService,
                private _router: Router) { }

                intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
                    // Add organization id to all requests.
                    let filterParam = request.body;
                
                    if (filterParam) {
                        if (filterParam.filterParameters) {
                            filterParam.filterParameters['org_id'] = localStorage.getItem('signed_entity_id');
                            filterParam.filterParameters['signed_entity_id'] = localStorage.getItem('signed_entity_id');
                
                            filterParam['org_id'] = localStorage.getItem('signed_entity_id');
                            filterParam['signed_entity_id'] = localStorage.getItem('signed_entity_id');
                        } else if (filterParam instanceof FormData) {
                            if (filterParam.has('postData')) {
                                var postData = filterParam.get('postData');
                
                                if (postData) {
                                    var obj = JSON.parse(postData.toString());
                                    obj['org_id'] = localStorage.getItem('signed_entity_id');
                                    obj['signed_entity_id'] = localStorage.getItem('signed_entity_id');
                                    filterParam.set('postData', JSON.stringify(obj));
                                }
                            }
                        } else {
                            filterParam['org_id'] = localStorage.getItem('signed_entity_id');
                            filterParam['signed_entity_id'] = localStorage.getItem('signed_entity_id');
                        }
                    }
                
                    // add authorization header with jwt token if available
                    let currentUser = this.authenticationService.currentUserValue;
                
                    if (currentUser && currentUser.token) {
                        request = request.clone({
                            setHeaders: {
                                Authorization: `Bearer ${currentUser.token}`,
                            },
                            body: filterParam
                        });
                    }
                
                    return next.handle(request);
                }
                
}
