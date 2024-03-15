import { ObjectId } from "mongodb";

export interface Session {
  _id?: any;
  date?: string;
  startTime?: string;
  endTime?: string;
  sessionType?: string;
  name?: string;
  authorName?: string;
  roomUrl?: string;
  timezone?: string;
  key?: string;
  daylightSaving?: boolean;
  sessionTopic?: string;
  notesUrl?: string;
  keyDownloaded?: boolean;
}