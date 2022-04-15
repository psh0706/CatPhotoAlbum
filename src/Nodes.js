export default function Nodes({$app, initialState, onClick, onBackClick}) {
    
    // state : 노드 데이터 (화면 상 표시되는 파일 또는 디렉토리 요소들)
    this.state = initialState
    this.onClick = onClick
    this.onBackClick = onBackClick

    this.$target = document.createElement('ul')
    this.$target.className = 'Nodes'
    $app.appendChild(this.$target)

    this.setState = (nextState) => {
        this.state = nextState
        this.render()
    }

    this.render = () => {
        if(this.state.nodes){
            const nodeTemplate = this.state.nodes.map(node => {
                // 노드 이미지 -> 파일은 파일 아이콘, 디렉토리는 디렉토리 아이콘
                const iconPath = node.type === 'FILE' ? './assets/file.png' : './assets/directory.png'

                return `
                    <div class="Node" data-node-id="${node.id}">
                        <img src="${iconPath}" />
                        <div>${node.name}</div>
                    </div>
                `
            }).join('')

            // 뒤로가기 이미지 (루트에서는 보이지 않는다)
            this.$target.innerHTML = !this.state.isRoot ? `<div class="Node prevArea"><img class="prev" src="./assets/prev.png"></div>${nodeTemplate}` : nodeTemplate
        }
    }

    this.$target.addEventListener('click' , (e) => {
        // closest 를 이용한 이벤트 위임
        const $node = e.target.closest('.Node');

        if($node) {
            //.Node 라는 클래스를 가진 요소에서 data-blahblah 인 속성 값을 가져오기.
            // 여기서는 클릭된 노드의 data-node-id 값을 가져온다.
            const {nodeId} = $node.dataset

            if(!nodeId) {
                // 노드 id 가 없는 요소 == 뒤로가기 요소
                // 뒤로가기 이벤트 핸들러 작동
                this.onBackClick()
                return
            }

            // 어떤 노드를 클릭 한 것인지 찾기
            const selectedNode = this.state.nodes.find(node => node.id === nodeId)

            // 클릭된 노드가 이벤트 핸들러 작동
            if (selectedNode) {
                this.onClick(selectedNode)
            }
        }
    })

    this.render()
}