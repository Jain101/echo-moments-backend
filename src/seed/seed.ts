import { supabase } from './constants';

async function seed() {
  try {
    // Insert tags
    const { data: tags, error: tagsError } = await supabase
      .from('tags')
      .insert([{ name: 'romantic' }, { name: 'missed' }, { name: 'serendipity' }])
      .select();

    if (tagsError) throw tagsError;
    console.log('Inserted tags:', tags);

    // Insert posts
    const { data: posts, error: postsError } = await supabase
      .from("posts")
      .insert([
        {
          user_id: "7cae2f10-e74a-4428-8cf5-48f7edd6e2d3", // Replace with actual UUID from `auth.users`
          title: "Missed connection at the coffee shop",
          description: "We exchanged glances but didn’t get a chance to talk.",
          location: "Downtown Cafe",
          views_count: 15,
          likes_count: 3,
          status: "published",
        },
        {
          user_id: "f7aea3f6-f802-4bd7-a450-65ba66ca4673", // Replace with actual UUID from `auth.users`
          title: "Saw you at the concert",
          description:
            "You were wearing a red jacket and dancing to the music.",
          location: "City Arena",
          views_count: 25,
          likes_count: 7,
          status: "published",
        },
      ])
      .select();

    if (postsError) throw postsError;
    console.log('Inserted posts:', posts);

    // Insert comments
    const { data: comments, error: commentsError } = await supabase
      .from("comments")
      .insert([
        {
          post_id: posts[0].id,
          user_id: "a8e46edb-5eb7-49f4-9104-be413c84fe99", // Replace with actual UUID from `auth.users`
          comment_text: "I was there too! Small world.",
        },
        {
          post_id: posts[1].id,
          user_id: "7cae2f10-e74a-4428-8cf5-48f7edd6e2d3", // Replace with actual UUID from `auth.users`
          comment_text: "I think I saw you! Were you in the front row?",
        },
      ])
      .select();

    if (commentsError) throw commentsError;
    console.log('Inserted comments:', comments);

    // Insert post_tags
    const { data: postTags, error: postTagsError } = await supabase
      .from('post_tags')
      .insert([
        { post_id: posts[0].id, tag_id: tags[0].id },
        { post_id: posts[1].id, tag_id: tags[1].id },
      ])
      .select();

    if (postTagsError) throw postTagsError;
    console.log('Inserted post_tags:', postTags);

    // Insert post_interactions
    const { data: interactions, error: interactionsError } = await supabase
      .from("post_interactions")
      .insert([
        {
          post_id: posts[0].id,
          user_id: "f7aea3f6-f802-4bd7-a450-65ba66ca4673",
          type: "like",
        },
        {
          post_id: posts[1].id,
          user_id: "a8e46edb-5eb7-49f4-9104-be413c84fe99",
          type: "favorite",
        },
      ])
      .select();

    if (interactionsError) throw interactionsError;
    console.log('Inserted post_interactions:', interactions);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

seed();
