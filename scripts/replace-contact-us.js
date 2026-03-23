const { PrismaClient } = require('@prisma/client');

const db = new PrismaClient();

function replaceText(value) {
  if (typeof value === 'string') {
    if (value === 'Contact Us' || value === 'connect with us' || value === 'Connect With Us') {
      return 'Connect with us';
    }
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(replaceText);
  }

  if (value && typeof value === 'object') {
    const updated = {};
    for (const [key, val] of Object.entries(value)) {
      updated[key] = replaceText(val);
    }
    return updated;
  }

  return value;
}

async function main() {
  const sections = await db.section.findMany();
  let updatedCount = 0;

  for (const section of sections) {
    const original = section.content;
    const updated = replaceText(original);

    if (JSON.stringify(original) !== JSON.stringify(updated)) {
      await db.section.update({
        where: { id: section.id },
        data: { content: updated },
      });
      updatedCount += 1;
    }
  }

  console.log(`Updated sections: ${updatedCount}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await db.$disconnect();
  });
