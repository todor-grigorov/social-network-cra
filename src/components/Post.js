import React, { forwardRef } from 'react'
import { Avatar } from '@material-ui/core';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import '../css/Post.css';
import InputOption from './InputOption';

const Post = forwardRef(({ name, description, message, photoUrl, userPhotoUrl, videoUrl, type }, ref) => {
    return (
        <div ref={ref} className="post">
            <div className="post__header">
                <Avatar src={userPhotoUrl || ''} alt="user-avatar" >{name ? name[0].toUpperCase() : 'T'}</Avatar>
                <div className="post__info">
                    <h2>{name}</h2>
                    <p>{description}</p>
                </div>
            </div>

            <div className="post__body">
                <p>{message}</p>
                {photoUrl && type === "image" ?
                    <img src={photoUrl} alt="post-pic" />
                    :
                    (null)
                }
                {videoUrl && type === "video" ?
                    <video src={videoUrl} controls>
                        Your browser does not support the video tag.
                    </video>
                    :
                    (null)
                }
            </div>

            <div className="post__buttons">
                <InputOption Icon={ThumbUpAltOutlinedIcon} title="Like" color="gray" />
                <InputOption Icon={ChatOutlinedIcon} title="Comment" color="gray" />
                <InputOption Icon={ShareOutlinedIcon} title="Share" color="gray" />
                <InputOption Icon={SendOutlinedIcon} title="Send" color="gray" />
            </div>
        </div>
    )
})

export default Post
