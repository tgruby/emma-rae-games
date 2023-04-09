
/* Simple 2D Array of the environment.  We need 2 images for non-on-center walls, and 1 for on-center walls. 
[
      [distant-left-edge-edge], [distant-left-edge], [distant-left], [distant-center], [distant-right],    [distant-right-edge], [distant-right-edge-edge],
                                [far-left-edge],     [far-left],     [far-center],     [far-right],        [far-right-edge],
                                [mid-left-edge],     [mid-left],     [mid-center],     [mid-right],        [mid-right-edge],
                                                     [near-left],   [near-center],     [near-right-front]
  ];
*/

function initGameLayout(imageArea) {
    const wallImage = 'stories/test/brick-wall.svg';
    const blankImage = 'img/blank.svg';

    const defaultImage = blankImage;

    // zIndexes should be: near: 32, mid: 16, far: 8, distant: 4

    // Build Images.  Assuming the viewable area is a 1024w x 1024h x 1024d cube, set level perspectives relative to their depth.
    let nearLeftSide = new Image();
    nearLeftSide.id = 'near_left_side';
    nearLeftSide.src = defaultImage;
    Object.assign(nearLeftSide.style, {
        position: 'absolute',
        top: '240px',
        left: '-32px',
        zIndex: '32',
        width: '544px',
        transform: 'perspective(512px) rotateY(62deg)'
    })
    imageArea.appendChild(nearLeftSide);

    const nearCenterFront = new Image();
    nearCenterFront.id = 'near_center_front';
    nearCenterFront.src = defaultImage;
    Object.assign(nearCenterFront.style, {
        position: 'absolute',
        top: '0px',
        left: '0px',
        zIndex: '64',
        width: '1024px'
    })
    imageArea.appendChild(nearCenterFront);

    const midLeftFront = new Image();
    midLeftFront.id = 'mid_left_front';
    midLeftFront.src = defaultImage;
    Object.assign(midLeftFront.style, {
        position: 'absolute',
        top: '326px',
        left: '-43px',
        zIndex: '16',
        width: '371px',
        height: '371px'
    })
    imageArea.appendChild(midLeftFront);

    const midLeftSide = new Image();
    midLeftSide.id = 'mid_left_side';
    midLeftSide.src = defaultImage;
    Object.assign(midLeftSide.style, {
        position: 'absolute',
        top: '374px',
        left: '237px',
        zIndex: '16',
        width: '275px',
        transform: 'perspective(512px) rotateY(75deg)'
    })
    imageArea.appendChild(midLeftSide);


    const midCenterFront = new Image();
    midCenterFront.id = 'mid_center_front';
    midCenterFront.src = defaultImage;
    Object.assign(midCenterFront.style, {
        position: 'absolute',
        top: '326px',
        left: '327px',
        zIndex: '16',
        width: '371px',
        height: '371px'
    })
    imageArea.appendChild(midCenterFront);

    const farLeftFront = new Image();
    farLeftFront.id = 'far_left_front';
    farLeftFront.src = defaultImage;
    Object.assign(farLeftFront.style, {
        position: 'absolute',
        top: '402px',
        left: '183px',
        zIndex: '8',
        width: '220px'
    })
    imageArea.appendChild(farLeftFront);


    const farCenterFront = new Image();
    farCenterFront.id = 'far_center_front';
    farCenterFront.src = defaultImage;
    Object.assign(farCenterFront.style, {
        position: 'absolute',
        top: '402px',
        left: '401px',
        zIndex: '8',
        width: '220px'
    })
    imageArea.appendChild(farCenterFront);

    const farLeftEdgeFront = new Image();
    farLeftEdgeFront.id = 'far_left_edge_front';
    farLeftEdgeFront.src = defaultImage;
    Object.assign(farLeftEdgeFront.style, {
        position: 'absolute',
        top: '402px',
        left: '-36px',
        zIndex: '8',
        width: '220px'
    })
    imageArea.appendChild(farLeftEdgeFront);

    const farLeftEdgeSide = new Image();
    farLeftEdgeSide.id = 'far_left_edge_side';
    farLeftEdgeSide.src = defaultImage;
    Object.assign(farLeftEdgeSide.style, {
        position: 'absolute', 
        top: '421px', 
        left: '112px', 
        zIndex: '6', 
        width: '181px', 
        transform: 'perspective(512px) rotateY(80deg)'
    })
    imageArea.appendChild(farLeftEdgeSide);

    const farLeftSide = new Image();
    farLeftSide.id = 'far_left_side';
    farLeftSide.src = defaultImage;
    Object.assign(farLeftSide.style, {
        position: 'absolute', 
        top: '421px', 
        left: '331px', 
        zIndex: '6', 
        width: '181px', 
        transform: 'perspective(512px) rotateY(80deg)'
    })
    imageArea.appendChild(farLeftSide);

    const distantLeftFront = new Image();
    distantLeftFront.id = 'distant_left_front';
    distantLeftFront.src = defaultImage;
    Object.assign(distantLeftFront.style, {
        position: 'absolute',
        top: '434px',
        left: '280px',
        zIndex: '4',
        width: '155px'
    })
    imageArea.appendChild(distantLeftFront);

    const distantLeftEdgeFront = new Image();
    distantLeftEdgeFront.id = 'distant_left_edge_front';
    distantLeftEdgeFront.src = defaultImage;
    Object.assign(distantLeftEdgeFront.style, {
        position: 'absolute',
        top: '434px',
        left: '126px',
        zIndex: '4',
        width: '155px'
    })
    imageArea.appendChild(distantLeftEdgeFront);

    const distantLeftEdgeEdgeFront = new Image();
    distantLeftEdgeEdgeFront.id = 'distant_left_edge_edge_front';
    distantLeftEdgeEdgeFront.src = defaultImage;
    Object.assign(distantLeftEdgeEdgeFront.style, {
        position: 'absolute',
        top: '434px',
        left: '-28px',
        zIndex: '4',
        width: '155px'  
    })
    imageArea.appendChild(distantLeftEdgeEdgeFront);

    const distantCenterFront = new Image();
    distantCenterFront.id = 'distant_center_front';
    distantCenterFront.src = defaultImage;
    Object.assign(distantCenterFront.style, {
        position: 'absolute',
        top: '434px',
        left: '434px',
        zIndex: '4',
        width: '155px'
    })
    imageArea.appendChild(distantCenterFront);

    const distantRightFront = new Image();
    distantRightFront.id = 'distant_right_front';
    distantRightFront.src = defaultImage;
    Object.assign(distantRightFront.style, {
        position: 'absolute',
        top: '434px',
        left: '588px',
        zIndex: '4',
        width: '155px'
    })
    imageArea.appendChild(distantRightFront);

    const distantRightEdgeFront = new Image();
    distantRightEdgeFront.id = 'distant_right_edge_front';
    distantRightEdgeFront.src = defaultImage;
    Object.assign(distantRightEdgeFront.style, {
        position: 'absolute',
        top: '434px',
        left: '742px',
        zIndex: '4',
        width: '155px'
    })
    imageArea.appendChild(distantRightEdgeFront);

    const distantRightEdgeEdgeFront = new Image();
    distantRightEdgeEdgeFront.id = 'distant_right_edge_edge_front';
    distantRightEdgeEdgeFront.src = defaultImage;
    Object.assign(distantRightEdgeEdgeFront.style, {
        position: 'absolute',
        top: '434px',
        left: '896px',
        zIndex: '4',
        width: '155px'
    })
    imageArea.appendChild(distantRightEdgeEdgeFront);

    const farRightFront = new Image();
    farRightFront.id = 'far_right_front';
    farRightFront.src = defaultImage;
    Object.assign(farRightFront.style, {
        position: 'absolute',
        top: '402px',
        left: '620px',
        zIndex: '8',
        width: '220px'
    })
    imageArea.appendChild(farRightFront);

    const farRightSide = new Image();
    farRightSide.id = 'far_right_side';
    farRightSide.src = defaultImage;
    Object.assign(farRightSide.style, {
        position: 'absolute',
        top: '421px',
        left: '511px',
        zIndex: '6',
        width: '181px',
        transform: 'perspective(512px) rotateY(100deg)'
    })
    imageArea.appendChild(farRightSide);

    const farRighEdgetSide = new Image();
    farRighEdgetSide.id = 'far_right_edge_side';
    farRighEdgetSide.src = defaultImage;
    Object.assign(farRighEdgetSide.style, {
        position: 'absolute',
        top: '421px',
        left: '730px',
        zIndex: '6',
        width: '181px',
        transform: 'perspective(512px) rotateY(100deg)'
    })
    imageArea.appendChild(farRighEdgetSide);

    const farRightEdgeFront = new Image();
    farRightEdgeFront.id = 'far_right_edge_front';
    farRightEdgeFront.src = defaultImage;
    Object.assign(farRightEdgeFront.style, {
        position: 'absolute',
        top: '402px',
        left: '839px',
        zIndex: '8',
        width: '220px'
    })
    imageArea.appendChild(farRightEdgeFront);

    const midRightSide = new Image();
    midRightSide.id = 'mid_right_side';
    midRightSide.src = defaultImage;
    Object.assign(midRightSide.style, {
        position: 'absolute',
        top: '374px',
        left: '511px',
        zIndex: '8',
        width: '275px',
        transform: 'perspective(512px) rotateY(105deg)'
    })
    imageArea.appendChild(midRightSide);

    const midRightFront = new Image();
    midRightFront.id = 'mid_right_front';
    midRightFront.src = defaultImage;
    Object.assign(midRightFront.style, {
        position: 'absolute',
        top: '326px',
        left: '696px',
        zIndex: '32',
        width: '371px',
        height: '371px'
    })
    imageArea.appendChild(midRightFront);

    const nearRightSide = new Image();
    nearRightSide.id = 'near_right_side';
    nearRightSide.src = defaultImage;
    Object.assign(nearRightSide.style, {
        position: 'absolute',
        top: '240px',
        left: '511px',
        zIndex: '32',
        width: '544px',
        transform: 'perspective(512px) rotateY(118deg)'
    })
    imageArea.appendChild(nearRightSide);
}