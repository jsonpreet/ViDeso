import Link from "next/link";

export const LinkifyRenderLink = ({ attributes, content }) => {
    const { href, ...props } = attributes;
    return <Link to={href} className='brandGradientText' {...props}>{content}</Link>;
};

export const LinkifyOptions = {
    formatHref: {
        //hashtag: (href) => "/hashtag/" + href.substr(1).toLowerCase(),
        mention: (href) => "/circle/" + href.substr(1).toLowerCase(),
    },
    render: {
        mention: LinkifyRenderLink,
        //hashtag: LinkifyRenderLink,
        url: ({ attributes, content }) => {
            return <a {...attributes} className='brandGradientText' target="_blank">{content}</a>
        },
    },
    nl2br: true
};