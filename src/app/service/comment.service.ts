import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CommentRequestDTO } from "../model/comment/comment.model";
import { ServerService } from "./server.service";

@Injectable({
  providedIn: "root",
})
export class CommentService {
  constructor(private serverService: ServerService, private http: HttpClient) { }

  private url: string = `${this.serverService.getServer()}/comment`;

  public findAllBySession(sessionId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.url}/session?sessionId=${sessionId}`);
  }

  public persistComment(commentRequestDTO: CommentRequestDTO): Observable<Comment> {
    return this.http.post<Comment>(`${this.url}`, CommentRequestDTO);
  }

  public deleteComment(commentId: number): Observable<void> {
    return this.http.get<void>(`${this.url}?commentId=${commentId}`);
  }
}
