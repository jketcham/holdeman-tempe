<script lang="ts">
  import Container from "../../../components/Container.svelte";
  import SEO from "../../../components/SEO.svelte";
  import Image from "../../../components/Image.svelte";
  import type { PageMetadata } from "$lib/types/metadata";
  import { getProjectById } from "$lib/projects";
  import { page } from "$app/stores";
  import { error } from "@sveltejs/kit";

  const slug = $page.params.slug;
  const project = getProjectById(slug);

  if (!project) {
    error(404, "Project not found");
  }

  // Get the fallback format for metadata
  const fallbackFormat = project.image.formats.includes("jpg")
    ? "jpg"
    : project.image.formats.includes("jpeg")
      ? "jpeg"
      : project.image.formats[0];

  const pageMetadata: PageMetadata = {
    title: project.title,
    description: project.description,
    image: `${project.image.path}.${fallbackFormat}`,
    type: "article",
    publishedAt: "2024-03-03T00:00:00Z",
    modifiedAt: "2024-03-03T00:00:00Z",
  };
</script>

<SEO metadata={pageMetadata} />

<Container class="mb-10 mt-4">
  <div class="flex flex-col py-8 text-center">
    <h1 class="mb-2 font-display text-3xl font-bold uppercase">{project.title}</h1>
    <h2 class="text-lg">{project.year}</h2>
  </div>

  <hr />

  <div class="my-8 space-y-4">
    <p>{project.description}</p>
  </div>

  <div class="my-8">
    <Image image={project.image} className="w-full rounded-lg" loading="lazy" />
    {#if project.image.credit}
      <p class="mt-2 text-sm text-neutral-600 text-right pr-2">
        Photo by 
        {#if project.image.credit.url}
          <a href={project.image.credit.url} target="_blank" rel="noopener noreferrer" class="text-blue-600 underline hover:text-blue-800">
            {project.image.credit.name}
          </a>
        {:else}
          {project.image.credit.name}
        {/if}
      </p>
    {/if}
  </div>

  {#if project.id === "2025"}
    <div class="my-8 space-y-4">
      <h2 class="text-2xl">Hardy Drive Bike Lane Project</h2>
      <p>
        The Hardy Drive Bike Lane Project was a community-led initiative to create vibrant and safer
        bike lanes on Hardy Drive. The project involved designing and painting beautiful murals along
        the bike lanes, making them more visible and enhancing the neighborhood's aesthetic appeal.
      </p>

      <p>
        This project was completed in March of 2025 with the help of over 50 community volunteers and
        the talented artist
        <a
          href="https://www.nnuzzo.com/?utm_source=holdemantempe&utm_medium=referral&utm_campaign=project-2025"
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-600 underline hover:text-blue-800"
        >
          Nicole Poppell</a
        >.
      </p>

      <div class="my-6 space-y-4 rounded-lg bg-holdeman/10 p-6">
        <h3 class="text-xl font-bold">Project Journey</h3>
        
        <div class="space-y-2">
          <h4 class="font-semibold">Planning & Grant Application - Spring 2024</h4>
          <p>
            In Spring 2024, the Holdeman Neighborhood Association decided to pursue a bike lane mural project to enhance safety and beautify Hardy Drive. The association put together a proposal, solicited estimates from artists to include in the application, and submitted it to the City of Tempe on April 22, 2024, as part of the Maryanne Corder Neighborhood Grant Program.
          </p>
        </div>
        
        <div class="space-y-2">
          <h4 class="font-semibold">Artist Selection - Summer 2024</h4>
          <p>
            In July 2024, we received the exciting news that our project was awarded funding through the grant program, allowing us to move forward with artist selection.
          </p>
          <p>
            Then, from mid-July to early August, the neighborhood held a vote to select an artist for the project. After reviewing multiple talented candidates and collecting community input, Nicole Poppell was chosen to lead the artistic vision for the bike lane murals.
          </p>
        </div>
        
        <div class="space-y-2">
          <h4 class="font-semibold">Design Selection - Fall 2024</h4>
          <p>
            Nicole created two unique design concepts for the bike lanes, which were presented to the community at the <a href="https://www.tempe.gov/government/city-manager-s-office/neighborhood-services/getting-arizona-involved-in-neighborhoods-gain" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline hover:text-blue-800">GAIN</a> event at Clark Park on October 19, 2024. The neighborhood then voted on their preferred design through November 22, 2024.
          </p>
          <p>
            With votes collected from the community, Design Option 1 was selected as the winning concept. Nicole described her approach:
          </p>
          <blockquote class="border-l-4 border-holdeman-300 pl-4 italic text-neutral-700 my-4">
            "I have long been fascinated by shapes found in nature. In particular, studying shadows and how they hint at the objects while also leaving room for imagination, creating new shapes that morph into one another, similar to clouds.<br /><br />For the bike lane designs, I've photographed plants around my yard and translated them into flat patterns using color interaction that interweave geometric shapes."
          </blockquote>
        </div>
        
        <div class="space-y-2">
          <h4 class="font-semibold">Installation - February/March 2025</h4>
          <p>
            The installation took place in two phases, with work on the east side of Hardy Drive followed by the west side. Nicole led both the artistic vision and the implementation of the project, guiding community volunteers throughout the installation.
          </p>
          <p>
            Over 50 community volunteers participated, working in shifts under Nicole's direction. The project transformed ordinary bike lanes into colorful, eye-catching pathways that enhance both safety and neighborhood pride.
          </p>
        </div>
      </div>

      <h3 class="mt-6 text-xl font-bold">Project Highlights</h3>
      <ul class="list-disc space-y-2 pl-4">
        <li>Community-designed bike lane murals</li>
        <li>Enhanced safety for cyclists and pedestrians</li>
        <li>Beautification of Hardy Drive</li>
        <li>Strengthened community bonds through volunteer participation</li>
        <li>Funded through the Maryanne Corder Neighborhood Grant Program</li>
        <li>Part of Tempe's Adaptive Streets initiative</li>
      </ul>
    </div>
  {:else if project.id === "2026"}
    <div class="my-8 space-y-4">
      <h2 class="text-2xl">Neighborhood Tree Planting Project</h2>
      <p>
        After a couple rounds of voting, we're excited to move forward with a proposal to plant trees
        in the neighborhood—and potentially incorporate water reclamation measures to enhance our
        green infrastructure. We'll also be looking into how much the grant could help cover updates
        to irrigation systems as part of this tree planting, as that's often the biggest barrier to
        getting and keeping a tree.
      </p>

      <p>
        We are currently preparing a proposal for the <a
          href="https://www.tempe.gov/government/city-manager-s-office/neighborhood-services/neighborhood-grant-program?utm_source=holdemantempe&utm_medium=referral&utm_campaign=project-2026"
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-600 underline hover:text-blue-800"
          >City of Tempe Neighborhood Grant Program</a
        >. Funding is not guaranteed, and the project will only proceed if our grant application is
        approved.
      </p>

      <div class="my-8 rounded-lg bg-holdeman/10 p-6 text-center">
        <h3 class="mb-4 text-xl font-bold">Interested in a Tree for Your Yard?</h3>
        <p class="mb-6">
          If you are interested in receiving a tree through our grant for your front or side yard,
          please submit the form below so we can start compiling a list and get an idea of the tree
          canopy we can add to the neighborhood. This will help strengthen our grant application.
        </p>
        <a
          href="https://forms.gle/TsUZXfZXSa1nZj8G8"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block rounded bg-holdeman-400 px-6 py-4 font-bold transition hover:bg-holdeman-500"
        >
          Submit Tree Interest Form
        </a>
      </div>

      <p>
        In particular, we will be looking for trees that can enhance the shade available on the
        sidewalks, so if you've got a spot you think could use a tree, please let us know!
      </p>

      <h3 class="mt-6 text-xl font-bold">Project Timeline</h3>
      <div class="space-y-4">
        <div class="space-y-2">
          <ul class="list-disc space-y-2 pl-4">
            <li>April 23, 2025: Grant application deadline</li>
            <li>End of June 2025: Grant decisions made</li>
          </ul>
        </div>
      </div>

      <h3 class="mt-6 text-xl font-bold">Project Benefits</h3>
      <ul class="list-disc space-y-2 pl-4">
        <li>Enhanced shade on sidewalks and public spaces</li>
        <li>Reduced urban heat island effect</li>
        <li>Improved air quality</li>
        <li>Beautification of neighborhood streets</li>
        <li>Potential water conservation through reclamation measures</li>
      </ul>

      <h3 class="mt-6 text-xl font-bold">Get Involved</h3>
      <p>
        We are now preparing the application for the neighborhood grant for submission by Wednesday,
        April 23. If you'd like to lend a hand in drafting this proposal or just to learn more about
        the process, please reach out to Jack Ketcham at <a
          href="mailto:jack@holdemantempe.org"
          class="text-blue-600 underline hover:text-blue-800"
        >jack@holdemantempe.org</a>.
      </p>
    </div>
  {/if}

  <div class="my-12 rounded-lg border border-neutral-200 bg-neutral-50 p-6">
    <h2 class="mb-4 text-2xl font-bold">Want to do this in your neighborhood?</h2>
    
    <div class="space-y-4">
      <p>
        The Hardy Drive Bike Lane Project was made possible through Tempe's Neighborhood Grant Program and Adaptive Streets initiative.
      </p>
      <p class="italic">
        Your neighborhood could be next!
      </p>
      
      <div class="space-y-2">
        <h3 class="text-xl font-semibold">About the Neighborhood Grant Program</h3>
        <p>
          Established in 1994, the Maryanne Corder Neighborhood Grant Program provides funding for community-driven projects that enhance neighborhoods and build community connections. Tempe offers grants to Neighborhood Associations (NAs) and Homeowners Associations (HOAs) to fund projects for art, sustainable landscaping, park improvements, adaptive streets initiatives and more. Up to $20,000 is awarded to selected NAs and HOAs.
        </p>
        <p>
          <a 
            href="https://www.tempe.gov/government/city-manager-s-office/neighborhood-services/neighborhood-grant-program"
            target="_blank"
            rel="noopener noreferrer"
            class="text-blue-600 underline hover:text-blue-800"
          >
            Learn more about the Neighborhood Grant Program →
          </a>
        </p>
      </div>
      
      <div class="space-y-2">
        <h3 class="text-xl font-semibold">About Adaptive Streets</h3>
        <p>
          Tempe's Adaptive Streets initiative transforms public spaces to create safer, more vibrant streets for all users. These projects can include bike lane murals, intersection art, traffic calming measures, and other creative interventions that improve street safety and neighborhood character.
        </p>
        <p>
          <a 
            href="https://www.tempe.gov/government/transportation-and-sustainability/transportation/streetscape-projects/adaptive-streets"
            target="_blank"
            rel="noopener noreferrer"
            class="text-blue-600 underline hover:text-blue-800"
          >
            Explore Tempe's Adaptive Streets Program →
          </a>
        </p>
      </div>
      
      <div class="mt-4 pt-2 border-t border-neutral-200">
        <p class="font-semibold mb-1">Ready to start a project in your neighborhood?</p>
        <p>
          Contact Tempe's Neighborhood Services at <a href="mailto:neighborhoods@tempe.gov" class="text-blue-600 underline hover:text-blue-800">neighborhoods@tempe.gov</a> or your neighborhood association to begin the conversation about bringing creative street improvements to your area.
        </p>
      </div>
    </div>
  </div>

  <div class="mt-8">
    <a href="/projects" class="text-blue-600 underline hover:text-blue-800">
      &larr; Back to All Projects
    </a>
  </div>
</Container>
