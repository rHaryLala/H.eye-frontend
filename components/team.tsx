import Link from 'next/link'

const features = [
    {
        name: 'Attendance',
        role: 'Perfect for your class',
        avatar: 'https://cdn-icons-png.freepik.com/512/9634/9634392.png?uid=R68770228&ga=GA1.1.1825146064.1743666970',
    },
    {
        name: 'Facial Recognition',
        role: 'For your security',
        avatar: 'https://cdn-icons-png.freepik.com/512/11262/11262157.png?uid=R68770228&ga=GA1.1.1825146064.1743666970',
    },
    {
        name: 'Geolocation',
        role: 'For your safety',
        avatar: 'https://cdn-icons-png.freepik.com/512/544/544102.png?uid=R68770228&ga=GA1.1.1825146064.1743666970',
    },
]

export default function TeamSection() {
    return (
        <section className="bg-gray-50 py-16 md:py-32 dark:bg-transparent">
            <div className="mx-auto max-w-5xl border-t px-6">
                <span className="text-caption -ml-6 -mt-3.5 block w-max bg-gray-50 px-6 dark:bg-gray-950">Features</span>
                <div className="mt-12 gap-4 sm:grid sm:grid-cols-2 md:mt-24">
                    <div className="sm:w-2/5">
                        <h2 className="text-3xl font-bold sm:text-4xl">Our features</h2>
                    </div>
                    <div className="mt-6 sm:mt-0">
                        <p>Our application is made to meet the needs of each customer because our happiness is their satisfaction.</p>
                    </div>
                </div>
                <div className="mt-12 md:mt-24">
                    <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature, index) => (
                            <div key={index} className="group overflow-hidden">
                                <img className="h-77 w-full rounded-md object-cover object-top grayscale transition-all duration-500 hover:grayscale-0 group-hover:h-[22.5rem] group-hover:rounded-xl" src={feature.avatar} alt="img" width="500" height="500" />
                                <div className="px-2 pt-2 sm:pb-0 sm:pt-4">
                                    <div className="flex justify-between">
                                        <h3 className="text-title text-base font-medium transition-all duration-500 group-hover:tracking-wider">{feature.name}</h3>
                                        <span className="text-xs">_0{index + 1}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
