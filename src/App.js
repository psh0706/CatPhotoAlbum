import Breadcrumb from './Breadcrumb.js'
import Nodes from './Nodes.js'
import {request} from './api.js'
import ImageView from './ImageView.js'
import Loading from './Loading.js'

const cache = {}

export default function App($app) {
    this.state = {
        isRoot: true,
        isLoading: false,
        nodes: [],
        depth: [],
        selectedFilePath: null
    }

    const loading = new Loading({
        $app,
        initialState: this.state.isLoading
    })

    const requestWithLoding = async (nodeId) => {
        // 로딩화면 처리를 위한 reqeust 래핑
        try {
            this.setState({
                ...this.state,
                isLoading: true
            })

            const res = await request(nodeId)
            
            return res

        } catch (error) {
            console.log(error)
        } finally {
            this.setState({
                ...this.state,
                isLoading: false
            })
        }
        return res
    }

    const imageView = new ImageView({
        $app,
        initialState: this.state.selectedFilePath
    })

    const breadcrumb = new Breadcrumb({
        $app,
        initialState: this.state.depth,
        onClick: (index) => {
            //root
            if (index === null) {
                this.setState({
                    ...this.setState,
                    isRoot: true,
                    depth: [],
                    nodes: cache.root
                })
                return
            }

            //현재 위치를 누른 경우
            if (index === this.state.depth.length - 1) {
                return
            }

            const nextState = {...this.state}
            const nextDepth = this.state.depth.slice(0, index + 1)

            this.setState({
                ...nextState,
                depth: nextDepth,
                nodes: cache[nextDepth[nextDepth.length - 1].id],
                selectedFilePath: null
            })
        }
    })

    const nodes = new Nodes({
        $app, 
        initialState: {
            isRoot: this.state.isRoot,
            nodes: this.state.nodes
        },
        onClick: async (node) => {
            if (node.type === 'DIRECTORY') {
                //디렉토리인 경우
                if(cache[node.id]){
                    this.setState({
                        ...this.state,
                        selectedFilePath: null,
                        isRoot: false,
                        depth: [...this.state.depth, node],
                        nodes: cache[node.id]
                    })
                } else {
                    const nextNodes = await requestWithLoding(node.id)

                    this.setState ({
                        ...this.state,
                        isRoot: false,
                        depth: [...this.state.depth, node],
                        nodes: nextNodes
                    })

                    // 캐시에 등록
                    cache[node.id] = nextNodes
                }
            } else if (node.type === 'FILE') {
                //파일인 경우
                this.setState({
                    ...this.state,
                    selectedFilePath: node.filePath
                })
            }
        },
        onBackClick: async () => {
            const nextState = {
                ...this.state,
                selectedFilePath: null
            }
            nextState.depth.pop()

            const prevNodeId = nextState.depth.length === 0 ? null : nextState.depth[nextState.depth.length - 1].id

            if (prevNodeId === null) {
                this.setState({
                    ...nextState,
                    selectedFilePath: null,
                    isRoot: true,
                    nodes: cache.root
                })
            } else {
                this.setState({
                    ...nextState,
                    selectedFilePath: null,
                    isRoot: false,
                    nodes: cache[prevNodeId],
                })
            }
        }
    })

    this.setState = (nextState) => {
        this.state = nextState
        breadcrumb.setState(this.state.depth)
        nodes.setState({
            isRoot: this.state.isRoot,
            nodes: this.state.nodes
        })
        imageView.setState(this.state.selectedFilePath)
        loading.setState(this.state.isLoading)
    }

    const init = async () => {
        const rootNodes = await requestWithLoding()
            
        this.setState({
            ...this.state,
            isRoot: true,
            nodes: rootNodes
        })

        cache.root = rootNodes
    }

    init()
}
