export interface replyItem {
  guestBookId: number;
  writerId: number;
  writerNickName: string;
  content: string;
  registDateTime: string;
}

export interface replyInputData {
  ownerId: number;
  content: string;
}
