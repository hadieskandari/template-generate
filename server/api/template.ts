export default defineEventHandler(async (event) => {
    return {
        status: 200,
        body: {
            id: 1,
            name: "Home",
            description: "Home page",
            components: [
                {
                    component: "simple-header",
                    props: {
                        color: "primary",
                    },
                    order: 1,
                },
                {
                    component: "category-carousel",
                    props: {
                        color: "primary",
                    },
                    order: 2,
                },
                {
                    component: "footer",
                    props: {
                        color: "primary",
                    },
                    order: 3,
                },
            ],
        },
    };
});
