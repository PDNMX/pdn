const fs = require('fs');

function getFailedTests(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const json = JSON.parse(data);

        if (!json.testResults || !Array.isArray(json.testResults)) {
            console.log('❌ No se encontró el array "testResults" en el JSON');
            return;
        }

        // Filtrar solo los test suites que fallaron
        const failedTestSuites = json.testResults.filter(test =>
            test.status === 'failed'
        );

        console.log(`\n🔴 Test suites fallidos encontrados: ${failedTestSuites.length}\n`);

        if (failedTestSuites.length === 0) {
            console.log('✅ No hay tests fallidos.');
            return;
        }

        failedTestSuites.forEach((suite, index) => {
            console.log(`═══════════════════════════════════════`);
            console.log(`📁 Suite ${index + 1}: ${suite.name}`);
            console.log(`⏱️  Tiempo: ${(suite.endTime - suite.startTime) / 1000}s`);
            console.log(`═══════════════════════════════════════\n`);

            // Mostrar los assertions (tests individuales) que fallaron
            if (suite.assertionResults && Array.isArray(suite.assertionResults)) {
                const failedAssertions = suite.assertionResults.filter(
                    assertion => assertion.status === 'failed'
                );

                failedAssertions.forEach((assertion, i) => {
                    console.log(`❌ ${i + 1}. ${assertion.fullName || assertion.title}`);
                    console.log(`${assertion.fullName || assertion.title}`);

                    if (assertion.failureMessages && assertion.failureMessages.length > 0) {
                        console.log(`   📛 Error:`);
                        assertion.failureMessages.forEach(msg => {
                            console.log(`   ${msg.trim()}`);
                        });
                    }
                    console.log('');
                });
            }

            // Mostrar mensaje general del suite si existe
            if (suite.message) {
                console.log(`💬 Mensaje del suite:\n${suite.failureMessages}\n`);
            }
        });

        // Opcional: Guardar solo los tests fallidos en un archivo JSON
        fs.writeFileSync('failed-tests.json', JSON.stringify(failedTestSuites, null, 2));
        console.log(`💾 Tests fallidos guardados en "failed-tests.json"`);

        return failedTestSuites;

    } catch (error) {
        console.error('❌ Error al leer o procesar el JSON:', error.message);
    }
}

// ======================== USO ========================
const archivoJson = './resultados.json';   // ← Cambia esta ruta

getFailedTests(archivoJson);