﻿using System;
using Xunit;
using Xunit.Abstractions;


namespace Shiny.Generators.Tests
{
    public class StartupGenerationTests : IDisposable
    {
        readonly ITestOutputHelper output;
        readonly AssemblyGenerator generator;


        public StartupGenerationTests(ITestOutputHelper output)
        {
            this.output = output;
            this.generator = new AssemblyGenerator();
            this.generator.AddReference("Mono.Android");
            this.generator.AddReference("Shiny");
            this.generator.AddReference("Shiny.Core");
        }

        public void Dispose() => throw new NotImplementedException();

        [Fact]
        public void Test()
        {
            this.generator.AddSource("[assembly: Shiny.ShinyApplicationAttribute]");
            var compile = this.generator.DoGenerate(
                nameof(Test),
                new AndroidApplicationSourceGenerator()
            );


            //compile.AssertTypesExist("");
        }


        public void TestJobDetection()
        {

        }
    }
}
