const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const events = await prisma.event.findMany();
        const services = await prisma.service.findMany();
        const portfolio = await prisma.portfolio.findMany();
        console.log(JSON.stringify({ events, services, portfolio }, null, 2));
    } catch (error) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
