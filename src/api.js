const API_END_POINT = 'https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev'


// API_END_POINT + {nodeId}  === 특정 디렉토리 내의 노드
// API_END_POINT === 루트 디렉토리 내의 노드
export const request = async (nodeId) => {
    try {
        const res = await fetch(`${API_END_POINT}/${nodeId ? nodeId : ''}`)

        if (!res.ok) {
            throw new Error('서버 상태 이상')
        }

        return await res.json();
    } catch (error) {
        throw new Error(`무언가 잘못 되었습니다 ! ${error.message}`)
    }
}