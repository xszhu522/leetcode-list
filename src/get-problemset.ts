import * as graphql from './graphql.js';

async function getInfoList(data: object) {
  let resp = await graphql.postData(graphql.graphqlUrl, data);
  return graphql.getInfoList(resp.data.problemsetQuestionList.questions);
}

async function handle(data: any, skip: number, limit: number) {
  data.variables.skip = skip;
  data.variables.limit = limit;
  let infoList = await getInfoList(data);
  console.log('length: ' + infoList.length);
  infoList.forEach(info => console.log(info));
}

let data = {
  "query": "\n    query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {\n  problemsetQuestionList(\n    categorySlug: $categorySlug\n    limit: $limit\n    skip: $skip\n    filters: $filters\n  ) {\n    hasMore\n    total\n    questions {\n      acRate\n      difficulty\n      freqBar\n      frontendQuestionId\n      isFavor\n      paidOnly\n      solutionNum\n      status\n      title\n      titleCn\n      titleSlug\n      topicTags {\n        name\n        nameTranslated\n        id\n        slug\n      }\n      extra {\n        hasVideoSolution\n        topCompanyTags {\n          imgUrl\n          slug\n          numSubscribed\n        }\n      }\n    }\n  }\n}\n    ",
  "variables": {
    "categorySlug": "all-code-essentials",
    "skip": 0,
    "limit": 100,
    "filters": {}
  },
  "operationName": "problemsetQuestionList"
};

handle(data, 0, 100);
