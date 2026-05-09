import AutoScroll from 'embla-carousel-auto-scroll';
import useEmblaCarousel from 'embla-carousel-react';

const Partner = () => {

    const logos = [
        {
          id: "logo-1",
          description: "Logo 1",
          image: "https://shadcnblocks.com/images/block/logos/astro-wordmark.svg",
          className: "h-7 w-auto",
        },
        {
          id: "logo-2",
          description: "Logo 2",
          image: "https://shadcnblocks.com/images/block/logos/figma-wordmark.svg",
          className: "h-7 w-auto",
        },
        {
          id: "logo-3",
          description: "Logo 3",
          image: "https://shadcnblocks.com/images/block/logos/nextjs-wordmark.svg",
          className: "h-7 w-auto",
        },
        {
          id: "logo-4",
          description: "Logo 4",
          image: "https://shadcnblocks.com/images/block/logos/react-wordmark.svg",
          className: "h-7 w-auto",
        },
        {
          id: "logo-5",
          description: "Logo 5",
          image: "https://shadcnblocks.com/images/block/logos/shadcn-ui-wordmark.svg",
          className: "h-7 w-auto",
        },
        {
          id: "logo-6",
          description: "Logo 6",
          image: "https://shadcnblocks.com/images/block/logos/supabase-wordmark.svg",
          className: "h-7 w-auto",
        },
        {
          id: "logo-7",
          description: "Logo 7",
          image: "https://shadcnblocks.com/images/block/logos/tailwind-wordmark.svg",
          className: "h-4 w-auto",
        },
        {
          id: "logo-8",
          description: "Logo 8",
          image: "https://shadcnblocks.com/images/block/logos/vercel-wordmark.svg",
          className: "h-7 w-auto",
        },
    ];

    const [emblaRef] = useEmblaCarousel ({loop: true}, [
        AutoScroll({ playOnInit: true })
    ])

    return (
        <div className='embla py-10'>
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {
                        logos.map((item) => (
                            <div className='embla__slide' key={item.id}>
                                <img 
                                    src={item.image}
                                    alt={item.description}
                                    className={item.className}
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Partner