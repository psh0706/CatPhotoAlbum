# CatPhotoAlbum
프로그래머스 과제였던 "고양이 사진첩 애플리케이션" 을 직접 구현한 프로젝트 입니다.  
기본적인 컴포넌트 외 모든 요구사항 구현을 `vanila js`를 통해 구현해 보았습니다.  
과제의 요구사항은 다음과 같습니다.

1. 주어진 API를 이용해 디렉토리 구조를 따라 탐색할 수 있는 사진첩 애플리케이션을 만듭니다.
2. 디렉토리를 클릭한 경우 해당 디렉토리 하위에 속한 디렉토리 / 파일들을 불러와 렌더링합니다.
3. 디렉토리 이동에 따라 위에 Breadcrumb 영역도 탐색한 디렉토리 순서에 맞게 업데이트가 되어야 합니다.
4. 디렉토리의 뒤로 가기 icon (왼쪽 화살표)를 누른 경우, 이전 디렉토리로 돌아가고,  
   파일을 누른 경우 해당 파일의 filePath 값을 이용해 이미지를 보여줍니다.
5. esc를 누르거나 사진 영역 밖을 클릭한 경우 이미지를 닫아야합니다.
6. Breadcrumb에 렌더링 된 경로 목록의 특정 아이템을 클릭하면, 해당 경로로 이동하도록 처리합니다.
7. 데이터가 로딩 중인 경우는 로딩 중임을 알리는 UI적 처리를 해야하며,  
   로딩 중에는 디렉토리 이동이나 파일 클릭 등 액션이 일어나는 것을 막아야 합니다.
8. 한번 로딩된 데이터는 메모리에 캐시하고 이미 탐색한 경로를 다시 탐색할 경우 
   http 요청을 하지 말고 캐시된 데이터를 불러와 렌더링하도록 합니다.

* * *

### Environment
Skill : `javascript`.  
editor : `VSCode` - `live Sever` 플러그인을 사용했습니다.

* * *

### API
* **root 내용 가져오기**  
  * https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev  
  * method: GET  
  * 사진첩의 root 경로에 있는 파일들과 디렉토리들을 불러옵니다. 응답의 예시는 아래와 같습니다.  
  
    ```jsx
    [
      {
            "id": "1",
            "name": "노란고양이",
            "type": "DIRECTORY",
            "filePath": null,
            "parent": null
        },
        {
            "id": "3",
            "name": "까만고양이",
            "type": "DIRECTORY",
            "filePath": null,
            "parent": null
        },
     .....
    ]
    ```
    
* **특정 디렉토리에 속하는 파일 / 디렉토리 불러오기**  
  * https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev/:nodeId  
  * method: GET  
  * nodeId 하위에 있는 파일 / 디렉토리 목록을 불러옵니다. 응답의 예시는 아래와 같습니다.  
  
    ```jsx
    [
        {
            "id": "5",
            "name": "2021/04",
            "type": "DIRECTORY",
            "filePath": null,
            "parent": {
                "id": "1"
            }
        },
        {
            "id": "19",
            "name": "물 마시는 사진",
            "type": "FILE",
            "filePath": "/images/a2i.jpg",
            "parent": {
                "id": "1"
            }
        }
    ]
    ```
* **이미지 불러오기**  
  * Node의 filePath 값을 아래의 값과 조합하여, 이미지를 불러올 수 있는 주소를 만들 수 있습니다.
  
    ```jsx
    https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public/${node.filePath}
    ```


* * *

### Example
![screencapture-127-0-0-1-5500-2022-04-16-17_02_50](https://user-images.githubusercontent.com/47502552/163667472-da1f7374-32b4-49dd-90eb-d8cdfe5d06dd.png)
로딩 화면  

![screencapture-127-0-0-1-5500-2022-04-16-17_03_06](https://user-images.githubusercontent.com/47502552/163667816-df003873-9500-499d-b002-248b2e0077e5.png)
root 디렉토리

![screencapture-127-0-0-1-5500-2022-04-16-17_03_28](https://user-images.githubusercontent.com/47502552/163667822-44fcf925-c0d7-4a9b-843b-0f21153f8e2b.png)
폴더 디렉토리

![screencapture-127-0-0-1-5500-2022-04-16-17_03_49](https://user-images.githubusercontent.com/47502552/163667825-03410e0f-4a23-431b-86b6-e007ea7275be.png)
이미지 

***

출처: 프로그래머스 코딩 테스트 연습, https://programmers.co.kr/learn/challenges
