import { FeedbackEmail } from "./feedbackEmail";
import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";

@NgModule({
  declarations: [FeedbackEmail],
  imports: [
      IonicPageModule.forChild(FeedbackEmail),
    ],
  entryComponents: [FeedbackEmail]
})
export class FeedbackEmailPageModule {}