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

function getInfoList(questions: any): string[] {
    let infoList: string[] = [];
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

const graphqlUrl = 'https://leetcode.cn/graphql/';

export { postData, getInfoList, graphqlUrl };
