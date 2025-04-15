import * as graphql from './graphql.js';

async function getInfoList(data: object) {
  let resp = await graphql.postData(graphql.graphqlUrl, data);
  return graphql.getInfoList(resp.data.favoriteQuestionList.questions);
}

async function handle(data: any, favoriteSlug: string, skip: number, limit: number) {
  data.variables.skip = skip;
  data.variables.limit = limit;
  data.variables.favoriteSlug = favoriteSlug;
  let infoList = await getInfoList(data);
  console.log('length: ' + infoList.length);
  infoList.forEach(info => console.log(info));
}

let data = {
  "query": "\n    query favoriteQuestionList($favoriteSlug: String!, $filter: FavoriteQuestionFilterInput, $searchKeyword: String, $filtersV2: QuestionFilterInput, $sortBy: QuestionSortByInput, $limit: Int, $skip: Int, $version: String = \"v2\") {\n  favoriteQuestionList(\n    favoriteSlug: $favoriteSlug\n    filter: $filter\n    filtersV2: $filtersV2\n    searchKeyword: $searchKeyword\n    sortBy: $sortBy\n    limit: $limit\n    skip: $skip\n    version: $version\n  ) {\n    questions {\n      difficulty\n      id\n      paidOnly\n      questionFrontendId\n      status\n      title\n      titleSlug\n      translatedTitle\n      isInMyFavorites\n      frequency\n      acRate\n      topicTags {\n        name\n        nameTranslated\n        slug\n      }\n    }\n    totalLength\n    hasMore\n  }\n}\n    ",
  "variables": {
    "skip": 0,
    "limit": 100,
    "favoriteSlug": "oaFIx3zT",
    "filtersV2": {
      "filterCombineType": "ALL",
      "statusFilter": {
        "questionStatuses": [],
        "operator": "IS"
      },
      "difficultyFilter": {
        "difficulties": [],
        "operator": "IS"
      },
      "languageFilter": {
        "languageSlugs": [],
        "operator": "IS"
      },
      "topicFilter": {
        "topicSlugs": [],
        "operator": "IS"
      },
      "acceptanceFilter": {},
      "frequencyFilter": {},
      "lastSubmittedFilter": {},
      "publishedFilter": {},
      "companyFilter": {
        "companySlugs": [],
        "operator": "IS"
      },
      "positionFilter": {
        "positionSlugs": [],
        "operator": "IS"
      },
      "premiumFilter": {
        "premiumStatus": [],
        "operator": "IS"
      }
    },
    "searchKeyword": "",
    "sortBy": {
      "sortField": "CUSTOM",
      "sortOrder": "ASCENDING"
    }
  },
  "operationName": "favoriteQuestionList"
};
// 公开的题单才能获取数据
handle(data, 'oaFIx3zT', 0, 100);
