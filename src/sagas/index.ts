import { all } from "redux-saga/effects";
import auth from "./auth";

export default function* IndexSagas() {
    yield all([
      auth(),
    //   linkedIn(),
    //   pageLoad(),
    //   dashboard(),
    //   search(),
    //   interaction(),
    //   booking(),
    //   academy(),
    //   interactionVideos(),
    //   screening(),
    //   jobs(),
    //   courses(),
    //   careerAssessment(),
    //   BoosterOtp(),
    //   Timer(),
    //   BoosterTest(),
    //   BoosterResult(),
    //   DiscoveryExperts(),
    //   specificCourseSaga(),
    //   careerPortalSaga(),
    //   domainDetailSaga(),
    //   searchSubDomainSaga(),
    //   searchFilterSaga(),
    //   webLinksSaga(),
    //   masterSagas(),
    //   globalSagas()
    ]);
  }
  