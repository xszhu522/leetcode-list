import axios from 'axios';

async function postData(url: string, data: object) {
    try {
        const response = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json',
                // 或者 'Content-Type': 'application/x-www-form-urlencoded'，取决于服务器期望的格式
            },
        });
        return response.data; // 返回响应数据
    } catch (error) {
        console.error('Error:', error);
    }
}

function getInfoList(resp: any): string[] {
    let infoList: string[] = [];
    let questions = resp.data.problemsetQuestionList.questions;
    for (let question of questions) {
        let tags = question.topicTags;
        let info = '';
        for (let tag of tags) {
            let name = tag.nameTranslated;
            if (name.length === 0) {
                name = tag.name;
            }
            info += name + ',';
        }
        info = info.substring(0, info.length - 1);
        infoList.push(info);
    }
    return infoList;
}

let url = 'https://leetcode.cn/graphql/';

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

async function handle(url: string, data: object) {
    let resp = await postData(url, data);
    let infoList = getInfoList(resp);
    console.log('length: ' + infoList.length);
    infoList.forEach(info => console.log(info));
}

handle(url, data);
