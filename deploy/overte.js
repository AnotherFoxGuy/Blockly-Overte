Blockly.Blocks['avatar_startanimation'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Avatar.startAnimation')
        this.appendValueInput('url')
            .setCheck('string')
            .appendField('url');
        this.appendValueInput('fps')
            .setCheck('number')
            .appendField('fps');
        this.appendValueInput('priority')
            .setCheck('number')
            .appendField('priority');
        this.appendValueInput('loop')
            .setCheck('boolean')
            .appendField('loop');
        this.appendValueInput('hold')
            .setCheck('boolean')
            .appendField('hold');
        this.appendValueInput('firstFrame')
            .setCheck('number')
            .appendField('firstFrame');
        this.appendValueInput('lastFrame')
            .setCheck('number')
            .appendField('lastFrame');
        this.appendValueInput('maskedJoints')
            .setCheck('Array.<string>')
            .appendField('maskedJoints');


        this.setColour(160);
        this.setTooltip('Starts playing an animation on the avatar.');
        this.setHelpUrl('https://apidocs.overte.org/Avatar.html#.startAnimation');
    }
};
javascript.javascriptGenerator.forBlock['avatar_startanimation'] = (block, generator) => {
    // Return code.
    return 'Avatar.startAnimation()';
};

Blockly.Blocks['avatar_stopanimation'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Avatar.stopAnimation')


        this.setColour(160);
        this.setTooltip('Stops playing the current animation.');
        this.setHelpUrl('https://apidocs.overte.org/Avatar.html#.stopAnimation');
    }
};
javascript.javascriptGenerator.forBlock['avatar_stopanimation'] = (block, generator) => {
    // Return code.
    return 'Avatar.stopAnimation()';
};

Blockly.Blocks['avatar_getanimationdetails'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Avatar.getAnimationDetails')

        this.setOutput(true, 'Avatar.AnimationDetails');
        this.setColour(160);
        this.setTooltip('Gets the details of the current avatar animation that is being or was recently played.');
        this.setHelpUrl('https://apidocs.overte.org/Avatar.html#.getAnimationDetails');
    }
};
javascript.javascriptGenerator.forBlock['avatar_getanimationdetails'] = (block, generator) => {
    // Return code.
    return 'Avatar.getAnimationDetails()';
};

Blockly.Blocks['avatar_getavatarentitydata'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Avatar.getAvatarEntityData')

        this.setOutput(true, 'AvatarEntityMap');
        this.setColour(160);
        this.setTooltip('Gets details of all avatar entities.<p><strong>Warning:</strong> Potentially an expensive call. Do not use if possible.</p>');
        this.setHelpUrl('https://apidocs.overte.org/Avatar.html#.getAvatarEntityData');
    }
};
javascript.javascriptGenerator.forBlock['avatar_getavatarentitydata'] = (block, generator) => {
    // Return code.
    return 'Avatar.getAvatarEntityData()';
};

Blockly.Blocks['avatar_setavatarentitydata'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Avatar.setAvatarEntityData')
        this.appendValueInput('avatarEntityData')
            .setCheck('AvatarEntityMap')
            .appendField('avatarEntityData');


        this.setColour(160);
        this.setTooltip('Sets all avatar entities from an object.<p><strong>Warning:</strong> Potentially an expensive call. Do not use if possible.</p>');
        this.setHelpUrl('https://apidocs.overte.org/Avatar.html#.setAvatarEntityData');
    }
};
javascript.javascriptGenerator.forBlock['avatar_setavatarentitydata'] = (block, generator) => {
    // Return code.
    return 'Avatar.setAvatarEntityData()';
};

Blockly.Blocks['avatar_update'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Avatar.update')
        this.appendValueInput('deltaTime')
            .setCheck('number')
            .appendField('deltaTime');


        this.setColour(160);
        this.setTooltip('');
        this.setHelpUrl('https://apidocs.overte.org/Avatar.html#.update');
    }
};
javascript.javascriptGenerator.forBlock['avatar_update'] = (block, generator) => {
    // Return code.
    return 'Avatar.update()';
};

Blockly.Blocks['avatar_setjointmappingsfromnetworkreply'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Avatar.setJointMappingsFromNetworkReply')


        this.setColour(160);
        this.setTooltip('');
        this.setHelpUrl('https://apidocs.overte.org/Avatar.html#.setJointMappingsFromNetworkReply');
    }
};
javascript.javascriptGenerator.forBlock['avatar_setjointmappingsfromnetworkreply'] = (block, generator) => {
    // Return code.
    return 'Avatar.setJointMappingsFromNetworkReply()';
};

Blockly.Blocks['avatar_getdomainminscale'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Avatar.getDomainMinScale')

        this.setOutput(true, 'number');
        this.setColour(160);
        this.setTooltip('Gets the minimum scale allowed for this avatar in the current domain.This value can change as the user changes avatars or when changing domains.');
        this.setHelpUrl('https://apidocs.overte.org/Avatar.html#.getDomainMinScale');
    }
};
javascript.javascriptGenerator.forBlock['avatar_getdomainminscale'] = (block, generator) => {
    // Return code.
    return 'Avatar.getDomainMinScale()';
};

Blockly.Blocks['avatar_getdomainmaxscale'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Avatar.getDomainMaxScale')

        this.setOutput(true, 'number');
        this.setColour(160);
        this.setTooltip('Gets the maximum scale allowed for this avatar in the current domain.This value can change as the user changes avatars or when changing domains.');
        this.setHelpUrl('https://apidocs.overte.org/Avatar.html#.getDomainMaxScale');
    }
};
javascript.javascriptGenerator.forBlock['avatar_getdomainmaxscale'] = (block, generator) => {
    // Return code.
    return 'Avatar.getDomainMaxScale()';
};

Blockly.Blocks['avatar_geteyeheight'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Avatar.getEyeHeight')

        this.setOutput(true, 'number');
        this.setColour(160);
        this.setTooltip('Gets the current eye height of the avatar.This height is only an estimate and might be incorrect for avatars that are missing standard joints.');
        this.setHelpUrl('https://apidocs.overte.org/Avatar.html#.getEyeHeight');
    }
};
javascript.javascriptGenerator.forBlock['avatar_geteyeheight'] = (block, generator) => {
    // Return code.
    return 'Avatar.getEyeHeight()';
};

Blockly.Blocks['avatar_getheight'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Avatar.getHeight')

        this.setOutput(true, 'number');
        this.setColour(160);
        this.setTooltip('Gets the current height of the avatar.This height is only an estimate and might be incorrect for avatars that are missing standard joints.');
        this.setHelpUrl('https://apidocs.overte.org/Avatar.html#.getHeight');
    }
};
javascript.javascriptGenerator.forBlock['avatar_getheight'] = (block, generator) => {
    // Return code.
    return 'Avatar.getHeight()';
};

Blockly.Blocks['avatar_sethandstate'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Avatar.setHandState')
        this.appendValueInput('state')
            .setCheck('HandState')
            .appendField('state');


        this.setColour(160);
        this.setTooltip('Sets the pointing state of the hands to control where the laser emanates from. If the right index finger is pointing, thelaser emanates from the tip of that finger, otherwise it emanates from the palm.');
        this.setHelpUrl('https://apidocs.overte.org/Avatar.html#.setHandState');
    }
};
javascript.javascriptGenerator.forBlock['avatar_sethandstate'] = (block, generator) => {
    // Return code.
    return 'Avatar.setHandState()';
};

Blockly.Blocks['avatar_gethandstate'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Avatar.getHandState')

        this.setOutput(true, 'HandState');
        this.setColour(160);
        this.setTooltip('Gets the pointing state of the hands to control where the laser emanates from. If the right index finger is pointing, thelaser emanates from the tip of that finger, otherwise it emanates from the palm.');
        this.setHelpUrl('https://apidocs.overte.org/Avatar.html#.getHandState');
    }
};
javascript.javascriptGenerator.forBlock['avatar_gethandstate'] = (block, generator) => {
    // Return code.
    return 'Avatar.getHandState()';
};

Blockly.Blocks['avatar_setjointdata'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Avatar.setJointData')
        this.appendValueInput('index')
            .setCheck('number')
            .appendField('index');
        this.appendValueInput('rotation')
            .setCheck('Quat')
            .appendField('rotation');
        this.appendValueInput('translation')
            .setCheck('Vec3')
            .appendField('translation');


        this.setColour(160);
        this.setTooltip('Sets a specific joint\'s rotation and position relative to its parent, in model coordinates.<p><strong>Warning:</strong> These coordinates are not necessarily in meters.</p><p>Setting joint data completely overrides/replaces all motion from the default animation system including inversekinematics, but just for the specified joint. So for example, if you were to procedurally manipulate the finger joints,the avatar\'s hand and head would still do inverse kinematics properly. However, as soon as you start to manipulatejoints in the inverse kinematics chain, the inverse kinematics might not function as you expect. For example, if you setthe rotation of the elbow, the hand inverse kinematics position won\'t end up in the right place.</p>');
        this.setHelpUrl('https://apidocs.overte.org/Avatar.html#.setJointData');
    }
};
javascript.javascriptGenerator.forBlock['avatar_setjointdata'] = (block, generator) => {
    // Return code.
    return 'Avatar.setJointData()';
};

Blockly.Blocks['avatar_setjointrotation'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Avatar.setJointRotation')
        this.appendValueInput('index')
            .setCheck('number')
            .appendField('index');
        this.appendValueInput('rotation')
            .setCheck('Quat')
            .appendField('rotation');


        this.setColour(160);
        this.setTooltip('Sets a specific joint\'s rotation relative to its parent.<p>Setting joint data completely overrides/replaces all motion from the default animation system including inversekinematics, but just for the specified joint. So for example, if you were to procedurally manipulate the finger joints,the avatar\'s hand and head would still do inverse kinematics properly. However, as soon as you start to manipulatejoints in the inverse kinematics chain, the inverse kinematics might not function as you expect. For example, if you setthe rotation of the elbow, the hand inverse kinematics position won\'t end up in the right place.</p>');
        this.setHelpUrl('https://apidocs.overte.org/Avatar.html#.setJointRotation');
    }
};
javascript.javascriptGenerator.forBlock['avatar_setjointrotation'] = (block, generator) => {
    // Return code.
    return 'Avatar.setJointRotation()';
};

Blockly.Blocks['avatar_setjointtranslation'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Avatar.setJointTranslation')
        this.appendValueInput('index')
            .setCheck('number')
            .appendField('index');
        this.appendValueInput('translation')
            .setCheck('Vec3')
            .appendField('translation');


        this.setColour(160);
        this.setTooltip('Sets a specific joint\'s translation relative to its parent, in model coordinates.<p><strong>Warning:</strong> These coordinates are not necessarily in meters.</p><p>Setting joint data completely overrides/replaces all motion from the default animation system including inversekinematics, but just for the specified joint. So for example, if you were to procedurally manipulate the finger joints,the avatar\'s hand and head would still do inverse kinematics properly. However, as soon as you start to manipulatejoints in the inverse kinematics chain, the inverse kinematics might not function as you expect. For example, if you setthe rotation of the elbow, the hand inverse kinematics position won\'t end up in the right place.</p>');
        this.setHelpUrl('https://apidocs.overte.org/Avatar.html#.setJointTranslation');
    }
};
javascript.javascriptGenerator.forBlock['avatar_setjointtranslation'] = (block, generator) => {
    // Return code.
    return 'Avatar.setJointTranslation()';
};

Blockly.Blocks['avatar_clearjointdata'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Avatar.clearJointData')
        this.appendValueInput('index')
            .setCheck('number')
            .appendField('index');


        this.setColour(160);
        this.setTooltip('Clears joint translations and rotations set by script for a specific joint. This restores all motion from the defaultanimation system including inverse kinematics for that joint.<p>Note: This is slightly faster than the function variation that specifies the joint name.</p>');
        this.setHelpUrl('https://apidocs.overte.org/Avatar.html#.clearJointData');
    }
};
javascript.javascriptGenerator.forBlock['avatar_clearjointdata'] = (block, generator) => {
    // Return code.
    return 'Avatar.clearJointData()';
};

Blockly.Blocks['avatar_isjointdatavalid'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Avatar.isJointDataValid')
        this.appendValueInput('index')
            .setCheck('number')
            .appendField('index');

        this.setOutput(true, 'boolean');
        this.setColour(160);
        this.setTooltip('Checks that the data for a joint are valid.');
        this.setHelpUrl('https://apidocs.overte.org/Avatar.html#.isJointDataValid');
    }
};
javascript.javascriptGenerator.forBlock['avatar_isjointdatavalid'] = (block, generator) => {
    // Return code.
    return 'Avatar.isJointDataValid()';
};

Blockly.Blocks['avatar_getjointrotation'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Avatar.getJointRotation')
        this.appendValueInput('index')
            .setCheck('number')
            .appendField('index');

        this.setOutput(true, 'Quat');
        this.setColour(160);
        this.setTooltip('Gets the rotation of a joint relative to its parent. For information on the joint hierarchy used, see<a href="https://docs.overte.org/create/avatars/avatar-standards.html">Avatar Standards</a>.');
        this.setHelpUrl('https://apidocs.overte.org/Avatar.html#.getJointRotation');
    }
};
javascript.javascriptGenerator.forBlock['avatar_getjointrotation'] = (block, generator) => {
    // Return code.
    return 'Avatar.getJointRotation()';
};

Blockly.Blocks['avatar_getjointtranslation'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Avatar.getJointTranslation')
        this.appendValueInput('index')
            .setCheck('number')
            .appendField('index');

        this.setOutput(true, 'Vec3');
        this.setColour(160);
        this.setTooltip('Gets the translation of a joint relative to its parent, in model coordinates.<p><strong>Warning:</strong> These coordinates are not necessarily in meters.</p><p>For information on the joint hierarchy used, see<a href="https://docs.overte.org/create/avatars/avatar-standards.html">Avatar Standards</a>.</p>');
        this.setHelpUrl('https://apidocs.overte.org/Avatar.html#.getJointTranslation');
    }
};
javascript.javascriptGenerator.forBlock['avatar_getjointtranslation'] = (block, generator) => {
    // Return code.
    return 'Avatar.getJointTranslation()';
};

Blockly.Blocks['avatar_setjointdata'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Avatar.setJointData')
        this.appendValueInput('name')
            .setCheck('string')
            .appendField('name');
        this.appendValueInput('rotation')
            .setCheck('Quat')
            .appendField('rotation');
        this.appendValueInput('translation')
            .setCheck('Vec3')
            .appendField('translation');


        this.setColour(160);
        this.setTooltip('Sets a specific joint\'s rotation and position relative to its parent, in model coordinates.<p><strong>Warning:</strong> These coordinates are not necessarily in meters.</p><p>Setting joint data completely overrides/replaces all motion from the default animation system including inversekinematics, but just for the specified joint. So for example, if you were to procedurally manipulate the finger joints,the avatar\'s hand and head would still do inverse kinematics properly. However, as soon as you start to manipulatejoints in the inverse kinematics chain, the inverse kinematics might not function as you expect. For example, if you setthe rotation of the elbow, the hand inverse kinematics position won\'t end up in the right place.</p>');
        this.setHelpUrl('https://apidocs.overte.org/Avatar.html#.setJointData');
    }
};
javascript.javascriptGenerator.forBlock['avatar_setjointdata'] = (block, generator) => {
    // Return code.
    return 'Avatar.setJointData()';
};

Blockly.Blocks['avatar_setjointrotation'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Avatar.setJointRotation')
        this.appendValueInput('name')
            .setCheck('string')
            .appendField('name');
        this.appendValueInput('rotation')
            .setCheck('Quat')
            .appendField('rotation');


        this.setColour(160);
        this.setTooltip('Sets a specific joint\'s rotation relative to its parent.<p>Setting joint data completely overrides/replaces all motion from the default animation system including inversekinematics, but just for the specified joint. So for example, if you were to procedurally manipulate the finger joints,the avatar\'s hand and head would still do inverse kinematics properly. However, as soon as you start to manipulatejoints in the inverse kinematics chain, the inverse kinematics might not function as you expect. For example, if you setthe rotation of the elbow, the hand inverse kinematics position won\'t end up in the right place.</p>');
        this.setHelpUrl('https://apidocs.overte.org/Avatar.html#.setJointRotation');
    }
};
javascript.javascriptGenerator.forBlock['avatar_setjointrotation'] = (block, generator) => {
    // Return code.
    return 'Avatar.setJointRotation()';
};

Blockly.Blocks['avatar_setjointtranslation'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Avatar.setJointTranslation')
        this.appendValueInput('name')
            .setCheck('string')
            .appendField('name');
        this.appendValueInput('translation')
            .setCheck('Vec3')
            .appendField('translation');


        this.setColour(160);
        this.setTooltip('Sets a specific joint\'s translation relative to its parent, in model coordinates.<p><strong>Warning:</strong> These coordinates are not necessarily in meters.</p><p>Setting joint data completely overrides/replaces all motion from the default animation system including inversekinematics, but just for the specified joint. So for example, if you were to procedurally manipulate the finger joints,the avatar\'s hand and head would still do inverse kinematics properly. However, as soon as you start to manipulatejoints in the inverse kinematics chain, the inverse kinematics might not function as you expect. For example, if you setthe rotation of the elbow, the hand inverse kinematics position won\'t end up in the right place.</p>');
        this.setHelpUrl('https://apidocs.overte.org/Avatar.html#.setJointTranslation');
    }
};
javascript.javascriptGenerator.forBlock['avatar_setjointtranslation'] = (block, generator) => {
    // Return code.
    return 'Avatar.setJointTranslation()';
};

Blockly.Blocks['avatar_clearjointdata'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Avatar.clearJointData')
        this.appendValueInput('name')
            .setCheck('string')
            .appendField('name');


        this.setColour(160);
        this.setTooltip('Clears joint translations and rotations set by script for a specific joint. This restores all motion from the defaultanimation system including inverse kinematics for that joint.<p>Note: This is slightly slower than the function variation that specifies the joint index.</p>');
        this.setHelpUrl('https://apidocs.overte.org/Avatar.html#.clearJointData');
    }
};
javascript.javascriptGenerator.forBlock['avatar_clearjointdata'] = (block, generator) => {
    // Return code.
    return 'Avatar.clearJointData()';
};

Blockly.Blocks['avatar_isjointdatavalid'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Avatar.isJointDataValid')
        this.appendValueInput('name')
            .setCheck('string')
            .appendField('name');

        this.setOutput(true, 'boolean');
        this.setColour(160);
        this.setTooltip('Checks if the data for a joint are valid.');
        this.setHelpUrl('https://apidocs.overte.org/Avatar.html#.isJointDataValid');
    }
};
javascript.javascriptGenerator.forBlock['avatar_isjointdatavalid'] = (block, generator) => {
    // Return code.
    return 'Avatar.isJointDataValid()';
};

Blockly.Blocks['avatar_getjointrotation'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Avatar.getJointRotation')
        this.appendValueInput('name')
            .setCheck('string')
            .appendField('name');

        this.setOutput(true, 'Quat');
        this.setColour(160);
        this.setTooltip('Gets the rotation of a joint relative to its parent. For information on the joint hierarchy used, see<a href="https://docs.overte.org/create/avatars/avatar-standards.html">Avatar Standards</a>.');
        this.setHelpUrl('https://apidocs.overte.org/Avatar.html#.getJointRotation');
    }
};
javascript.javascriptGenerator.forBlock['avatar_getjointrotation'] = (block, generator) => {
    // Return code.
    return 'Avatar.getJointRotation()';
};

Blockly.Blocks['avatar_getjointtranslation'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Avatar.getJointTranslation')
        this.appendValueInput('name')
            .setCheck('number')
            .appendField('name');

        this.setOutput(true, 'Vec3');
        this.setColour(160);
        this.setTooltip('Gets the translation of a joint relative to its parent, in model coordinates.<p><strong>Warning:</strong> These coordinates are not necessarily in meters.</p><p>For information on the joint hierarchy used, see<a href="https://docs.overte.org/create/avatars/avatar-standards.html">Avatar Standards</a>.</p>');
        this.setHelpUrl('https://apidocs.overte.org/Avatar.html#.getJointTranslation');
    }
};
javascript.javascriptGenerator.forBlock['avatar_getjointtranslation'] = (block, generator) => {
    // Return code.
    return 'Avatar.getJointTranslation()';
};

Blockly.Blocks['avatar_getjointrotations'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Avatar.getJointRotations')

        this.setOutput(true, 'Array.<Quat>');
        this.setColour(160);
        this.setTooltip('Gets the rotations of all joints in the current avatar. Each joint\'s rotation is relative to its parent joint.');
        this.setHelpUrl('https://apidocs.overte.org/Avatar.html#.getJointRotations');
    }
};
javascript.javascriptGenerator.forBlock['avatar_getjointrotations'] = (block, generator) => {
    // Return code.
    return 'Avatar.getJointRotations()';
};

Blockly.Blocks['avatar_getjointtranslations'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Avatar.getJointTranslations')

        this.setOutput(true, 'Array.<Vec3>');
        this.setColour(160);
        this.setTooltip('Gets the translations of all joints in the current avatar. Each joint\'s translation is relative to its parent joint, inmodel coordinates.<p><strong>Warning:</strong> These coordinates are not necessarily in meters.</p>');
        this.setHelpUrl('https://apidocs.overte.org/Avatar.html#.getJointTranslations');
    }
};
javascript.javascriptGenerator.forBlock['avatar_getjointtranslations'] = (block, generator) => {
    // Return code.
    return 'Avatar.getJointTranslations()';
};

Blockly.Blocks['avatar_setjointrotations'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Avatar.setJointRotations')
        this.appendValueInput('jointRotations')
            .setCheck('Array.<Quat>')
            .appendField('jointRotations');


        this.setColour(160);
        this.setTooltip('Sets the rotations of all joints in the current avatar. Each joint\'s rotation is relative to its parent joint.<p>Setting joint data completely overrides/replaces all motion from the default animation system including inversekinematics, but just for the specified joint. So for example, if you were to procedurally manipulate the finger joints,the avatar\'s hand and head would still do inverse kinematics properly. However, as soon as you start to manipulatejoints in the inverse kinematics chain, the inverse kinematics might not function as you expect. For example, if you setthe rotation of the elbow, the hand inverse kinematics position won\'t end up in the right place.</p>');
        this.setHelpUrl('https://apidocs.overte.org/Avatar.html#.setJointRotations');
    }
};
javascript.javascriptGenerator.forBlock['avatar_setjointrotations'] = (block, generator) => {
    // Return code.
    return 'Avatar.setJointRotations()';
};

Blockly.Blocks['avatar_setjointtranslations'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Avatar.setJointTranslations')
        this.appendValueInput('translations')
            .setCheck('Array.<Vec3>')
            .appendField('translations');


        this.setColour(160);
        this.setTooltip('Sets the translations of all joints in the current avatar. Each joint\'s translation is relative to its parent joint, inmodel coordinates.<p><strong>Warning:</strong> These coordinates are not necessarily in meters.</p><p>Setting joint data completely overrides/replaces all motion from the default animation system including inversekinematics, but just for the specified joint. So for example, if you were to procedurally manipulate the finger joints,the avatar\'s hand and head would still do inverse kinematics properly. However, as soon as you start to manipulatejoints in the inverse kinematics chain, the inverse kinematics might not function as you expect. For example, if you setthe rotation of the elbow, the hand inverse kinematics position won\'t end up in the right place.</p>');
        this.setHelpUrl('https://apidocs.overte.org/Avatar.html#.setJointTranslations');
    }
};
javascript.javascriptGenerator.forBlock['avatar_setjointtranslations'] = (block, generator) => {
    // Return code.
    return 'Avatar.setJointTranslations()';
};

Blockly.Blocks['avatar_clearjointsdata'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Avatar.clearJointsData')


        this.setColour(160);
        this.setTooltip('Clears all joint translations and rotations that have been set by script. This restores all motion from the defaultanimation system including inverse kinematics for all joints.');
        this.setHelpUrl('https://apidocs.overte.org/Avatar.html#.clearJointsData');
    }
};
javascript.javascriptGenerator.forBlock['avatar_clearjointsdata'] = (block, generator) => {
    // Return code.
    return 'Avatar.clearJointsData()';
};

Blockly.Blocks['avatar_getjointindex'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Avatar.getJointIndex')
        this.appendValueInput('name')
            .setCheck('string')
            .appendField('name');

        this.setOutput(true, 'number');
        this.setColour(160);
        this.setTooltip('Gets the joint index for a named joint. The joint index value is the position of the joint in the array returned by{@link MyAvatar.getJointNames}, or {@link Avatar.getJointNames} if using the <code>Avatar</code> API.');
        this.setHelpUrl('https://apidocs.overte.org/Avatar.html#.getJointIndex');
    }
};
javascript.javascriptGenerator.forBlock['avatar_getjointindex'] = (block, generator) => {
    // Return code.
    return 'Avatar.getJointIndex()';
};

Blockly.Blocks['avatar_getjointnames'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Avatar.getJointNames')

        this.setOutput(true, 'Array.<string>');
        this.setColour(160);
        this.setTooltip('Gets the names of all the joints in the current avatar.');
        this.setHelpUrl('https://apidocs.overte.org/Avatar.html#.getJointNames');
    }
};
javascript.javascriptGenerator.forBlock['avatar_getjointnames'] = (block, generator) => {
    // Return code.
    return 'Avatar.getJointNames()';
};

Blockly.Blocks['avatar_setblendshape'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Avatar.setBlendshape')
        this.appendValueInput('name')
            .setCheck('string')
            .appendField('name');
        this.appendValueInput('value')
            .setCheck('number')
            .appendField('value');


        this.setColour(160);
        this.setTooltip('Sets the value of a blend shape to animate your avatar\'s face. In order for other users to see the resulting animationson your avatar\'s face, set <code>hasScriptedBlendshapes</code> to <code>true</code>. When you are done using this API,set <code>hasScriptedBlendshapes</code> back to <code>false</code> when the animation is complete.');
        this.setHelpUrl('https://apidocs.overte.org/Avatar.html#.setBlendshape');
    }
};
javascript.javascriptGenerator.forBlock['avatar_setblendshape'] = (block, generator) => {
    // Return code.
    return 'Avatar.setBlendshape()';
};

Blockly.Blocks['avatar_getattachmentsvariant'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Avatar.getAttachmentsVariant')

        this.setOutput(true, 'Array.<AttachmentData>');
        this.setColour(160);
        this.setTooltip('Gets information about the models currently attached to your avatar.');
        this.setHelpUrl('https://apidocs.overte.org/Avatar.html#.getAttachmentsVariant');
    }
};
javascript.javascriptGenerator.forBlock['avatar_getattachmentsvariant'] = (block, generator) => {
    // Return code.
    return 'Avatar.getAttachmentsVariant()';
};

Blockly.Blocks['avatar_setattachmentsvariant'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Avatar.setAttachmentsVariant')
        this.appendValueInput('variant')
            .setCheck('Array.<AttachmentData>')
            .appendField('variant');


        this.setColour(160);
        this.setTooltip('Sets all models currently attached to your avatar. For example, if you retrieve attachment data using{@link MyAvatar.getAttachmentsVariant} or {@link Avatar.getAttachmentsVariant}, make changes to it, and then want toupdate your avatar\'s attachments per the changed data.');
        this.setHelpUrl('https://apidocs.overte.org/Avatar.html#.setAttachmentsVariant');
    }
};
javascript.javascriptGenerator.forBlock['avatar_setattachmentsvariant'] = (block, generator) => {
    // Return code.
    return 'Avatar.setAttachmentsVariant()';
};

Blockly.Blocks['avatar_updateavatarentity'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Avatar.updateAvatarEntity')
        this.appendValueInput('entityID')
            .setCheck('Uuid')
            .appendField('entityID');
        this.appendValueInput('entityData')
            .setCheck('ArrayBuffer')
            .appendField('entityData');


        this.setColour(160);
        this.setTooltip('');
        this.setHelpUrl('https://apidocs.overte.org/Avatar.html#.updateAvatarEntity');
    }
};
javascript.javascriptGenerator.forBlock['avatar_updateavatarentity'] = (block, generator) => {
    // Return code.
    return 'Avatar.updateAvatarEntity()';
};

Blockly.Blocks['avatar_clearavatarentity'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Avatar.clearAvatarEntity')
        this.appendValueInput('entityID')
            .setCheck('Uuid')
            .appendField('entityID');
        this.appendValueInput('requiresRemovalFromTree')
            .setCheck('boolean')
            .appendField('requiresRemovalFromTree');


        this.setColour(160);
        this.setTooltip('');
        this.setHelpUrl('https://apidocs.overte.org/Avatar.html#.clearAvatarEntity');
    }
};
javascript.javascriptGenerator.forBlock['avatar_clearavatarentity'] = (block, generator) => {
    // Return code.
    return 'Avatar.clearAvatarEntity()';
};

Blockly.Blocks['avatar_setforcefacetrackerconnected'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Avatar.setForceFaceTrackerConnected')
        this.appendValueInput('connected')
            .setCheck('boolean')
            .appendField('connected');


        this.setColour(160);
        this.setTooltip('Enables blend shapes set using {@link Avatar.setBlendshape} or {@link MyAvatar.setBlendshape} to be transmitted to otherusers so that they can see the animation of your avatar\'s face.<p class="important">Deprecated: This method is deprecated and will be removed. Use the<code>Avatar.hasScriptedBlendshapes</code> or <code>MyAvatar.hasScriptedBlendshapes</code>  property instead.</p>');
        this.setHelpUrl('https://apidocs.overte.org/Avatar.html#.setForceFaceTrackerConnected');
    }
};
javascript.javascriptGenerator.forBlock['avatar_setforcefacetrackerconnected'] = (block, generator) => {
    // Return code.
    return 'Avatar.setForceFaceTrackerConnected()';
};

Blockly.Blocks['avatar_setskeletonmodelurl'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Avatar.setSkeletonModelURL')
        this.appendValueInput('url')
            .setCheck('string')
            .appendField('url');


        this.setColour(160);
        this.setTooltip('Sets the avatar\'s skeleton model.');
        this.setHelpUrl('https://apidocs.overte.org/Avatar.html#.setSkeletonModelURL');
    }
};
javascript.javascriptGenerator.forBlock['avatar_setskeletonmodelurl'] = (block, generator) => {
    // Return code.
    return 'Avatar.setSkeletonModelURL()';
};

Blockly.Blocks['avatar_getattachmentdata'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Avatar.getAttachmentData')

        this.setOutput(true, 'Array.<AttachmentData>');
        this.setColour(160);
        this.setTooltip('Gets information about the models currently attached to your avatar.');
        this.setHelpUrl('https://apidocs.overte.org/Avatar.html#.getAttachmentData');
    }
};
javascript.javascriptGenerator.forBlock['avatar_getattachmentdata'] = (block, generator) => {
    // Return code.
    return 'Avatar.getAttachmentData()';
};

Blockly.Blocks['avatar_setattachmentdata'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Avatar.setAttachmentData')
        this.appendValueInput('attachmentData')
            .setCheck('Array.<AttachmentData>')
            .appendField('attachmentData');


        this.setColour(160);
        this.setTooltip('Sets all models currently attached to your avatar. For example, if you retrieve attachment data using{@link MyAvatar.getAttachmentData} or {@link Avatar.getAttachmentData}, make changes to it, and then want to update your avatar\'s attachments per thechanged data. You can also remove all attachments by using setting <code>attachmentData</code> to <code>null</code>.');
        this.setHelpUrl('https://apidocs.overte.org/Avatar.html#.setAttachmentData');
    }
};
javascript.javascriptGenerator.forBlock['avatar_setattachmentdata'] = (block, generator) => {
    // Return code.
    return 'Avatar.setAttachmentData()';
};

Blockly.Blocks['avatar_attach'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Avatar.attach')
        this.appendValueInput('modelURL')
            .setCheck('string')
            .appendField('modelURL');
        this.appendValueInput('jointName')
            .setCheck('string')
            .appendField('jointName');
        this.appendValueInput('translation')
            .setCheck('Vec3')
            .appendField('translation');
        this.appendValueInput('rotation')
            .setCheck('Quat')
            .appendField('rotation');
        this.appendValueInput('scale')
            .setCheck('number')
            .appendField('scale');
        this.appendValueInput('isSoft')
            .setCheck('boolean')
            .appendField('isSoft');
        this.appendValueInput('allowDuplicates')
            .setCheck('boolean')
            .appendField('allowDuplicates');
        this.appendValueInput('useSaved')
            .setCheck('boolean')
            .appendField('useSaved');


        this.setColour(160);
        this.setTooltip('Attaches a model to your avatar. For example, you can give your avatar a hat to wear, a guitar to hold, or a surfboard tostand on.');
        this.setHelpUrl('https://apidocs.overte.org/Avatar.html#.attach');
    }
};
javascript.javascriptGenerator.forBlock['avatar_attach'] = (block, generator) => {
    // Return code.
    return 'Avatar.attach()';
};

Blockly.Blocks['avatar_detachone'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Avatar.detachOne')
        this.appendValueInput('modelURL')
            .setCheck('string')
            .appendField('modelURL');
        this.appendValueInput('jointName')
            .setCheck('string')
            .appendField('jointName');


        this.setColour(160);
        this.setTooltip('Detaches the most recently attached instance of a particular model from either a specific joint or any joint.');
        this.setHelpUrl('https://apidocs.overte.org/Avatar.html#.detachOne');
    }
};
javascript.javascriptGenerator.forBlock['avatar_detachone'] = (block, generator) => {
    // Return code.
    return 'Avatar.detachOne()';
};

Blockly.Blocks['avatar_detachall'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Avatar.detachAll')
        this.appendValueInput('modelURL')
            .setCheck('string')
            .appendField('modelURL');
        this.appendValueInput('jointName')
            .setCheck('string')
            .appendField('jointName');


        this.setColour(160);
        this.setTooltip('Detaches all instances of a particular model from either a specific joint or all joints.');
        this.setHelpUrl('https://apidocs.overte.org/Avatar.html#.detachAll');
    }
};
javascript.javascriptGenerator.forBlock['avatar_detachall'] = (block, generator) => {
    // Return code.
    return 'Avatar.detachAll()';
};

Blockly.Blocks['avatar_getsensortoworldmatrix'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Avatar.getSensorToWorldMatrix')

        this.setOutput(true, 'Mat4');
        this.setColour(160);
        this.setTooltip('Gets the transform from the user\'s real world to the avatar\'s size, orientation, and position in the virtual world.');
        this.setHelpUrl('https://apidocs.overte.org/Avatar.html#.getSensorToWorldMatrix');
    }
};
javascript.javascriptGenerator.forBlock['avatar_getsensortoworldmatrix'] = (block, generator) => {
    // Return code.
    return 'Avatar.getSensorToWorldMatrix()';
};

Blockly.Blocks['avatar_getsensortoworldscale'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Avatar.getSensorToWorldScale')

        this.setOutput(true, 'number');
        this.setColour(160);
        this.setTooltip('Gets the scale that transforms dimensions in the user\'s real world to the avatar\'s size in the virtual world.');
        this.setHelpUrl('https://apidocs.overte.org/Avatar.html#.getSensorToWorldScale');
    }
};
javascript.javascriptGenerator.forBlock['avatar_getsensortoworldscale'] = (block, generator) => {
    // Return code.
    return 'Avatar.getSensorToWorldScale()';
};

Blockly.Blocks['avatar_getcontrollerlefthandmatrix'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Avatar.getControllerLeftHandMatrix')

        this.setOutput(true, 'Mat4');
        this.setColour(160);
        this.setTooltip('Gets the rotation and translation of the left hand controller relative to the avatar.');
        this.setHelpUrl('https://apidocs.overte.org/Avatar.html#.getControllerLeftHandMatrix');
    }
};
javascript.javascriptGenerator.forBlock['avatar_getcontrollerlefthandmatrix'] = (block, generator) => {
    // Return code.
    return 'Avatar.getControllerLeftHandMatrix()';
};

Blockly.Blocks['avatar_getcontrollerrighthandmatrix'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Avatar.getControllerRightHandMatrix')

        this.setOutput(true, 'Mat4');
        this.setColour(160);
        this.setTooltip('Gets the rotation and translation of the right hand controller relative to the avatar.');
        this.setHelpUrl('https://apidocs.overte.org/Avatar.html#.getControllerRightHandMatrix');
    }
};
javascript.javascriptGenerator.forBlock['avatar_getcontrollerrighthandmatrix'] = (block, generator) => {
    // Return code.
    return 'Avatar.getControllerRightHandMatrix()';
};

Blockly.Blocks['avatar_getdatarate'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Avatar.getDataRate')
        this.appendValueInput('rateName')
            .setCheck('AvatarDataRate')
            .appendField('rateName');

        this.setOutput(true, 'number');
        this.setColour(160);
        this.setTooltip('Gets the amount of avatar mixer data being generated by the avatar.');
        this.setHelpUrl('https://apidocs.overte.org/Avatar.html#.getDataRate');
    }
};
javascript.javascriptGenerator.forBlock['avatar_getdatarate'] = (block, generator) => {
    // Return code.
    return 'Avatar.getDataRate()';
};

Blockly.Blocks['avatar_getupdaterate'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Avatar.getUpdateRate')
        this.appendValueInput('rateName')
            .setCheck('AvatarUpdateRate')
            .appendField('rateName');

        this.setOutput(true, 'number');
        this.setColour(160);
        this.setTooltip('Gets the update rate of avatar mixer data being generated by the avatar.');
        this.setHelpUrl('https://apidocs.overte.org/Avatar.html#.getUpdateRate');
    }
};
javascript.javascriptGenerator.forBlock['avatar_getupdaterate'] = (block, generator) => {
    // Return code.
    return 'Avatar.getUpdateRate()';
};

Blockly.Blocks['avatar_sendavatardatapacket'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Avatar.sendAvatarDataPacket')
        this.appendValueInput('sendAll')
            .setCheck('boolean')
            .appendField('sendAll');

        this.setOutput(true, 'number');
        this.setColour(160);
        this.setTooltip('');
        this.setHelpUrl('https://apidocs.overte.org/Avatar.html#.sendAvatarDataPacket');
    }
};
javascript.javascriptGenerator.forBlock['avatar_sendavatardatapacket'] = (block, generator) => {
    // Return code.
    return 'Avatar.sendAvatarDataPacket()';
};

Blockly.Blocks['avatar_sendidentitypacket'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Avatar.sendIdentityPacket')

        this.setOutput(true, 'number');
        this.setColour(160);
        this.setTooltip('');
        this.setHelpUrl('https://apidocs.overte.org/Avatar.html#.sendIdentityPacket');
    }
};
javascript.javascriptGenerator.forBlock['avatar_sendidentitypacket'] = (block, generator) => {
    // Return code.
    return 'Avatar.sendIdentityPacket()';
};

Blockly.Blocks['avatar_setsessionuuid'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Avatar.setSessionUUID')
        this.appendValueInput('sessionUUID')
            .setCheck('Uuid')
            .appendField('sessionUUID');


        this.setColour(160);
        this.setTooltip('');
        this.setHelpUrl('https://apidocs.overte.org/Avatar.html#.setSessionUUID');
    }
};
javascript.javascriptGenerator.forBlock['avatar_setsessionuuid'] = (block, generator) => {
    // Return code.
    return 'Avatar.setSessionUUID()';
};

Blockly.Blocks['avatar_getabsolutejointrotationinobjectframe'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Avatar.getAbsoluteJointRotationInObjectFrame')
        this.appendValueInput('index')
            .setCheck('number')
            .appendField('index');

        this.setOutput(true, 'Quat');
        this.setColour(160);
        this.setTooltip('Gets the rotation of a joint relative to the avatar.<p><strong>Warning:</strong> Not able to be used in the <code>Avatar</code> API.</p>');
        this.setHelpUrl('https://apidocs.overte.org/Avatar.html#.getAbsoluteJointRotationInObjectFrame');
    }
};
javascript.javascriptGenerator.forBlock['avatar_getabsolutejointrotationinobjectframe'] = (block, generator) => {
    // Return code.
    return 'Avatar.getAbsoluteJointRotationInObjectFrame()';
};

Blockly.Blocks['avatar_getabsolutejointtranslationinobjectframe'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Avatar.getAbsoluteJointTranslationInObjectFrame')
        this.appendValueInput('index')
            .setCheck('number')
            .appendField('index');

        this.setOutput(true, 'Vec3');
        this.setColour(160);
        this.setTooltip('Gets the translation of a joint relative to the avatar.<p><strong>Warning:</strong> Not able to be used in the <code>Avatar</code> API.</p>');
        this.setHelpUrl('https://apidocs.overte.org/Avatar.html#.getAbsoluteJointTranslationInObjectFrame');
    }
};
javascript.javascriptGenerator.forBlock['avatar_getabsolutejointtranslationinobjectframe'] = (block, generator) => {
    // Return code.
    return 'Avatar.getAbsoluteJointTranslationInObjectFrame()';
};

Blockly.Blocks['avatar_setabsolutejointrotationinobjectframe'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Avatar.setAbsoluteJointRotationInObjectFrame')
        this.appendValueInput('index')
            .setCheck('number')
            .appendField('index');
        this.appendValueInput('rotation')
            .setCheck('Quat')
            .appendField('rotation');

        this.setOutput(true, 'boolean');
        this.setColour(160);
        this.setTooltip('Sets the rotation of a joint relative to the avatar.<p><strong>Warning:</strong> Not able to be used in the <code>Avatar</code> API.</p>');
        this.setHelpUrl('https://apidocs.overte.org/Avatar.html#.setAbsoluteJointRotationInObjectFrame');
    }
};
javascript.javascriptGenerator.forBlock['avatar_setabsolutejointrotationinobjectframe'] = (block, generator) => {
    // Return code.
    return 'Avatar.setAbsoluteJointRotationInObjectFrame()';
};

Blockly.Blocks['avatar_setabsolutejointtranslationinobjectframe'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Avatar.setAbsoluteJointTranslationInObjectFrame')
        this.appendValueInput('index')
            .setCheck('number')
            .appendField('index');
        this.appendValueInput('translation')
            .setCheck('Vec3')
            .appendField('translation');

        this.setOutput(true, 'boolean');
        this.setColour(160);
        this.setTooltip('Sets the translation of a joint relative to the avatar.<p><strong>Warning:</strong> Not able to be used in the <code>Avatar</code> API.</p>');
        this.setHelpUrl('https://apidocs.overte.org/Avatar.html#.setAbsoluteJointTranslationInObjectFrame');
    }
};
javascript.javascriptGenerator.forBlock['avatar_setabsolutejointtranslationinobjectframe'] = (block, generator) => {
    // Return code.
    return 'Avatar.setAbsoluteJointTranslationInObjectFrame()';
};

Blockly.Blocks['avatar_gettargetscale'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Avatar.getTargetScale')

        this.setOutput(true, 'number');
        this.setColour(160);
        this.setTooltip('Gets the target scale of the avatar without any restrictions on permissible values imposed by the domain. In contrast, the<code>scale</code> property\'s value may be limited by the domain\'s settings.');
        this.setHelpUrl('https://apidocs.overte.org/Avatar.html#.getTargetScale');
    }
};
javascript.javascriptGenerator.forBlock['avatar_gettargetscale'] = (block, generator) => {
    // Return code.
    return 'Avatar.getTargetScale()';
};

Blockly.Blocks['avatar_resetlastsent'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Avatar.resetLastSent')


        this.setColour(160);
        this.setTooltip('');
        this.setHelpUrl('https://apidocs.overte.org/Avatar.html#.resetLastSent');
    }
};
javascript.javascriptGenerator.forBlock['avatar_resetlastsent'] = (block, generator) => {
    // Return code.
    return 'Avatar.resetLastSent()';
};

var toolbox = {
    "kind": "categoryToolbox",
    "contents": [
        {
            "kind": "category",
            "name": "Avatar",
            "contents": [
                { "kind": "block", "type": "avatar_startanimation" }, { "kind": "block", "type": "avatar_stopanimation" }, { "kind": "block", "type": "avatar_getanimationdetails" }, { "kind": "block", "type": "avatar_getavatarentitydata" }, { "kind": "block", "type": "avatar_setavatarentitydata" }, { "kind": "block", "type": "avatar_update" }, { "kind": "block", "type": "avatar_setjointmappingsfromnetworkreply" }, { "kind": "block", "type": "avatar_getdomainminscale" }, { "kind": "block", "type": "avatar_getdomainmaxscale" }, { "kind": "block", "type": "avatar_geteyeheight" }, { "kind": "block", "type": "avatar_getheight" }, { "kind": "block", "type": "avatar_sethandstate" }, { "kind": "block", "type": "avatar_gethandstate" }, { "kind": "block", "type": "avatar_setjointdata" }, { "kind": "block", "type": "avatar_setjointrotation" }, { "kind": "block", "type": "avatar_setjointtranslation" }, { "kind": "block", "type": "avatar_clearjointdata" }, { "kind": "block", "type": "avatar_isjointdatavalid" }, { "kind": "block", "type": "avatar_getjointrotation" }, { "kind": "block", "type": "avatar_getjointtranslation" }, { "kind": "block", "type": "avatar_setjointdata" }, { "kind": "block", "type": "avatar_setjointrotation" }, { "kind": "block", "type": "avatar_setjointtranslation" }, { "kind": "block", "type": "avatar_clearjointdata" }, { "kind": "block", "type": "avatar_isjointdatavalid" }, { "kind": "block", "type": "avatar_getjointrotation" }, { "kind": "block", "type": "avatar_getjointtranslation" }, { "kind": "block", "type": "avatar_getjointrotations" }, { "kind": "block", "type": "avatar_getjointtranslations" }, { "kind": "block", "type": "avatar_setjointrotations" }, { "kind": "block", "type": "avatar_setjointtranslations" }, { "kind": "block", "type": "avatar_clearjointsdata" }, { "kind": "block", "type": "avatar_getjointindex" }, { "kind": "block", "type": "avatar_getjointnames" }, { "kind": "block", "type": "avatar_setblendshape" }, { "kind": "block", "type": "avatar_getattachmentsvariant" }, { "kind": "block", "type": "avatar_setattachmentsvariant" }, { "kind": "block", "type": "avatar_updateavatarentity" }, { "kind": "block", "type": "avatar_clearavatarentity" }, { "kind": "block", "type": "avatar_setforcefacetrackerconnected" }, { "kind": "block", "type": "avatar_setskeletonmodelurl" }, { "kind": "block", "type": "avatar_getattachmentdata" }, { "kind": "block", "type": "avatar_setattachmentdata" }, { "kind": "block", "type": "avatar_attach" }, { "kind": "block", "type": "avatar_detachone" }, { "kind": "block", "type": "avatar_detachall" }, { "kind": "block", "type": "avatar_getsensortoworldmatrix" }, { "kind": "block", "type": "avatar_getsensortoworldscale" }, { "kind": "block", "type": "avatar_getcontrollerlefthandmatrix" }, { "kind": "block", "type": "avatar_getcontrollerrighthandmatrix" }, { "kind": "block", "type": "avatar_getdatarate" }, { "kind": "block", "type": "avatar_getupdaterate" }, { "kind": "block", "type": "avatar_sendavatardatapacket" }, { "kind": "block", "type": "avatar_sendidentitypacket" }, { "kind": "block", "type": "avatar_setsessionuuid" }, { "kind": "block", "type": "avatar_getabsolutejointrotationinobjectframe" }, { "kind": "block", "type": "avatar_getabsolutejointtranslationinobjectframe" }, { "kind": "block", "type": "avatar_setabsolutejointrotationinobjectframe" }, { "kind": "block", "type": "avatar_setabsolutejointtranslationinobjectframe" }, { "kind": "block", "type": "avatar_gettargetscale" }, { "kind": "block", "type": "avatar_resetlastsent" },
            ]
        }
    ]
}