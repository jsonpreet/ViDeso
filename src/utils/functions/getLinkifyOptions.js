import Link from "next/link";

export const LinkifyRenderLink = ({ attributes, content }) => {
    const { href, ...props } = attributes;
    return <Link href={href} className='gradientLink' {...props}>{content}</Link>;
};

export const LinkifyOptions = {
    formatHref: {
        hashtag: (href) => "/explore/hashtag/" + href.substr(1).toLowerCase(),
        mention: (href) => "/@" + href.substr(1).toLowerCase(),
    },
    render: {
        mention: LinkifyRenderLink,
        hashtag: LinkifyRenderLink,
        url: ({ attributes, content }) => {
            return <a {...attributes} className='gradientLink' target="_blank">{content}</a>
        },
    },
    nl2br: true
};